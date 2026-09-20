import { XIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./icons";

type Brand = {
  x?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
};

/** Effront's own channels. Only listed here if it actually exists — no dead placeholders. */
const SOCIALS: Record<string, Brand> = {
  Effront: {
    x: "https://x.com/effrontgg",
    instagram: "https://www.instagram.com/effront.gg/",
    linkedin: "https://www.linkedin.com/company/effront",
    youtube: "https://www.youtube.com/@effront",
  },
};

const LINKS: {
  key: keyof Brand;
  label: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}[] = [
  { key: "x", label: "X", Icon: XIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "youtube", label: "YouTube", Icon: YouTubeIcon },
];

export function SocialLinks({ name = "Effront" }: { name?: string }) {
  const brand = SOCIALS[name];
  if (!brand) return null;

  return (
    <div className="foot-social">
      {LINKS.map(({ key, label, Icon }) => {
        const href = brand[key];
        if (!href) return null;
        return (
          <a
            key={key}
            href={href}
            aria-label={`${name} - ${label}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon width={13} height={13} />
          </a>
        );
      })}
    </div>
  );
}
