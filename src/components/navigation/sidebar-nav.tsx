"use client";

import { HouseIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiscordIcon } from "~/components/icons/discord-icon";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { env } from "~/env";
import { cn } from "~/lib/utils";
import { type RouterOutputs, api } from "~/trpc/react";

type Navlink = RouterOutputs["paynow"]["getNavlinks"][number];

const itemClass =
  "group flex items-center gap-3 rounded-sm border-l-2 border-transparent px-3 py-2 font-semibold text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground";

const activeClass = "border-primary bg-accent text-primary";

/** The store's categories (and their sub-categories) plus quick links, shown under the login card. */
export default function SidebarNav() {
  const pathname = usePathname();

  const { data: navlinks } = api.paynow.getNavlinks.useQuery();
  const { data: tags } = api.paynow.getTags.useQuery();

  const renderNavlink = (navlink: Navlink, depth = 0) => {
    const href = `/category/${navlink.tag_slug}`;
    const active = pathname === href;
    const image = tags?.find((tag) => tag.id === navlink.tag_id)?.image_url;

    return (
      <li key={navlink.node_id}>
        <Link
          href={href}
          className={cn(itemClass, active && activeClass)}
          style={{ marginLeft: depth * 16 }}
          aria-current={active ? "page" : undefined}
        >
          {image ? (
            <img
              src={image}
              alt=""
              className="size-5 shrink-0 rounded-xs object-cover"
            />
          ) : (
            <span className="size-5 shrink-0 text-center leading-5">•</span>
          )}

          <span className="truncate">{navlink.name}</span>
        </Link>

        {navlink.children?.length > 0 && (
          <ul className="space-y-1">
            {navlink.children.map((child) => renderNavlink(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <Card className="gap-2 py-4">
      <CardHeader>
        <CardTitle className="font-bold text-muted-foreground text-xs uppercase tracking-widest">
          Navigation
        </CardTitle>
      </CardHeader>

      <CardContent className="px-3">
        <nav aria-label="Store navigation">
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className={cn(itemClass, pathname === "/" && activeClass)}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                <HouseIcon weight="bold" className="size-5 shrink-0" />
                <span>Home</span>
              </Link>
            </li>

            {navlinks?.map((navlink) => renderNavlink(navlink))}

            <li>
              <a
                href={env.NEXT_PUBLIC_DISCORD_INVITE_URL}
                target="_blank"
                rel="noreferrer"
                className={itemClass}
              >
                <DiscordIcon className="size-5 shrink-0" />
                <span>Discord</span>
              </a>
            </li>
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}
