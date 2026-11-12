"use client";

import React from "react";
import { api } from "~/trpc/react";
import NavlinkCard from "./navlink-card";

export default function NavlinkCards() {
  const { data: navlinks } = api.paynow.getNavlinks.useQuery();

  if (!navlinks || !navlinks.length) {
    return null;
  }

  return (
    // Two cards per row on desktop; an odd one out (the 3rd, 5th, ...) is centred on its own row.
    // Each item takes half the row minus half the gap, so any number of categories still lines up.
    <div className="flex flex-wrap justify-center gap-6">
      {navlinks.map((navlink) => (
        <div
          key={navlink.node_id}
          className="w-full md:w-[calc(50%-0.75rem)] [&>a]:block"
        >
          <NavlinkCard navlink={navlink} />
        </div>
      ))}
    </div>
  );
}
