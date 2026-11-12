"use client";

import NavlinkCards from "~/components/navlink/navlink-cards";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="inline-block font-extrabold text-3xl">
            MintSMP Store
          </CardTitle>

          <CardDescription className="hidden" />
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="font-light">
            <p>
              Welcome to the official MintSMP store! Pick up ranks, crate keys
              and more to support the server and unlock extra perks.
            </p>

            <p>
              Log in with your Minecraft username to get started. All ranks are
              permanent - pay once and keep it for good.
            </p>
          </div>

          <div className="space-y-1">
            <h2 className="font-bold text-2xl">
              What payment methods do you accept?
            </h2>

            <p className="font-light">
              We accept a variety of payment methods, including PayPal, credit
              cards, and more.
            </p>
          </div>
        </CardContent>
      </Card>

      <NavlinkCards />
    </div>
  );
}
