import Image from "next/image";
import { CLIENTS } from "@/data/clients";

/** Renders nothing until CLIENTS has authorized entries. */
export function ClientLogos() {
  if (CLIENTS.length === 0) return null;

  const track = [...CLIENTS, ...CLIENTS];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {track.map((c, i) => (
          <Image key={`${c.name}-${i}`} src={c.logo} alt={c.name} width={140} height={40} />
        ))}
      </div>
    </div>
  );
}
