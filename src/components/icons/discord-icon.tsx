import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import type { SVGProps } from "react";

// The official Discord mark from Font Awesome Free (brand icons are CC BY 4.0).
// https://fontawesome.com/license/free
const [iconWidth, iconHeight, , , iconPath] = faDiscord.icon;

type DiscordIconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  /**
   * Accepted so this can be used wherever the Phosphor icons are (they take a `weight`),
   * but the brand mark only has one style.
   */
  weight?: string;
};

export function DiscordIcon({ weight: _weight, ...props }: DiscordIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${iconWidth} ${iconHeight}`}
      fill="currentColor"
      role="img"
      aria-label="Discord"
      {...props}
    >
      <path d={iconPath as string} />
    </svg>
  );
}
