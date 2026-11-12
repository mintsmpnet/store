"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { formatCents } from "~/lib/money";

import type { RouterOutputs } from "~/trpc/react";

type Props = {
  product: RouterOutputs["paynow"]["getProducts"][number];
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function ProductInfoDialog({ product, open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="sm:max-w-3xl">
        <div className="grid gap-6 sm:grid-cols-[14rem_minmax(0,1fr)]">
          {/* Left: the product's image and price */}
          <div className="flex flex-col items-center justify-center gap-4 self-start rounded-sm border bg-secondary/40 p-5 text-center">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="aspect-square w-full max-w-48 rounded-sm object-contain"
              />
            )}

            <div>
              {product.pricing?.active_sale && (
                <p className="font-semibold text-destructive line-through">
                  {formatCents(
                    product.pricing.price_original,
                    product.currency,
                  )}
                </p>
              )}

              <p className="font-bold text-2xl text-primary">
                {formatCents(
                  product.pricing?.price_final ?? 0,
                  product.currency,
                )}
              </p>
            </div>
          </div>

          {/* Right: what the dialog showed before - the name and description */}
          <div className="min-w-0 space-y-4">
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
            </DialogHeader>

            {product?.description && (
              <div
                className="[&_img]:max-w-full"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: n/a
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
