import Image from "next/image";

export type IconName =
  | "search"
  | "bug"
  | "crosshair"
  | "gauge"
  | "clipboard"
  | "shield-check"
  | "terminal"
  | "graduation-cap"
  | "shield-alert";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <Image
      src={`/icons/${name}.svg`}
      alt=""
      width={size}
      height={size}
      className={`icon-gold ${className ?? ""}`}
    />
  );
}

export function createIconComponent(name: IconName) {
  function NamedIcon({ size, className }: Omit<IconProps, "name">) {
    return <Icon name={name} size={size} className={className} />;
  }
  NamedIcon.displayName = name;
  return NamedIcon;
}

export const SearchIcon = createIconComponent("search");
export const BugIcon = createIconComponent("bug");
export const CrosshairIcon = createIconComponent("crosshair");
export const GaugeIcon = createIconComponent("gauge");
export const ClipboardIcon = createIconComponent("clipboard");
export const ShieldCheckIcon = createIconComponent("shield-check");
export const TerminalIcon = createIconComponent("terminal");
export const GraduationCapIcon = createIconComponent("graduation-cap");
export const ShieldAlertIcon = createIconComponent("shield-alert");
