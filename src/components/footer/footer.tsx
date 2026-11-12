import Link from "next/link";
import { DiscordIcon } from "~/components/icons/discord-icon";
import { Separator } from "~/components/ui/separator";
import { env } from "~/env";

const USEFUL_LINKS = [
  {
    name: "Discord",
    href: env.NEXT_PUBLIC_DISCORD_INVITE_URL,
    target: "_blank",
    rel: "noreferrer",
  },
  {
    name: "User Agreement",
    href: "https://paynow.gg/user-agreement",
    target: "_blank",
    rel: "noreferrer",
  },
  {
    name: "Terms Of Use",
    href: "https://paynow.gg/terms-of-use",
    target: "_blank",
    rel: "noreferrer",
  },
  {
    name: "Privacy Policy",
    href: "https://paynow.gg/privacy-policy",
    target: "_blank",
    rel: "noreferrer",
  },
];

const Footer = () => {
  return (
    <div className="mt-32 flex flex-col border-t bg-card shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.5)]">
      <footer>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 px-6 py-12 md:grid-cols-3 xl:px-0">
            <div>
              <h6>About Us</h6>

              <p className="mt-4 text-muted-foreground text-sm">
                MintSMP is a survival server built around a fair, grind-friendly
                economy. Every purchase here keeps the server running and
                supports new features, events and updates.
              </p>
            </div>

            <div>
              <h6>Useful Links</h6>

              <ul className="mt-4 space-y-2 text-sm">
                {USEFUL_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.target}
                      rel={link.rel}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6>Contact Us</h6>

              <p className="mt-4 text-muted-foreground text-sm">
                Need help with an order or a rank? Open a ticket in our Discord
                server and a staff member will get back to you.
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">
                &copy; MintSMP. All rights reserved. Powered by&nbsp;
                <Link
                  href="https://paynow.gg"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  PayNow.gg.
                </Link>
              </span>
            </div>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link href={env.NEXT_PUBLIC_DISCORD_INVITE_URL} target="_blank">
                <DiscordIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
