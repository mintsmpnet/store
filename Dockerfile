##### DEPENDENCIES

FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Husky's `prepare` hook needs a git checkout, which the image doesn't have.
ENV HUSKY=0

# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### BUILDER

FROM node:20-alpine AS builder
WORKDIR /app

# NEXT_PUBLIC_* values are inlined into the client bundle at build time, so they have to be
# build arguments (docker-compose.yml passes them from .env). Server secrets such as
# PAYNOW_API_KEY are NOT needed here - they are supplied at runtime only.
ARG NEXT_PUBLIC_BACKGROUND_IMAGE_URL
ARG NEXT_PUBLIC_WEBSITE_URL
ARG NEXT_PUBLIC_PAYNOW_STORE_ID
ARG NEXT_PUBLIC_DISCORD_INVITE_URL
ARG NEXT_PUBLIC_GAMESERVER_CONNECTION_MESSAGE
ENV NEXT_PUBLIC_BACKGROUND_IMAGE_URL=$NEXT_PUBLIC_BACKGROUND_IMAGE_URL \
    NEXT_PUBLIC_WEBSITE_URL=$NEXT_PUBLIC_WEBSITE_URL \
    NEXT_PUBLIC_PAYNOW_STORE_ID=$NEXT_PUBLIC_PAYNOW_STORE_ID \
    NEXT_PUBLIC_DISCORD_INVITE_URL=$NEXT_PUBLIC_DISCORD_INVITE_URL \
    NEXT_PUBLIC_GAMESERVER_CONNECTION_MESSAGE=$NEXT_PUBLIC_GAMESERVER_CONNECTION_MESSAGE

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN \
    if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn build; \
    elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && SKIP_ENV_VALIDATION=1 pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### RUNNER

FROM gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 4719
ENV PORT=4719
ENV HOSTNAME=0.0.0.0

CMD ["server.js"]
