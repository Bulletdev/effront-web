import {
  Terminal,
  Bug,
  Crosshair,
  Gauge,
  GraduationCap,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

export type ServiceMeta = {
  /** matches the key under the "Services" namespace in messages/*.json */
  id:
    | "platformPentest"
    | "gameLogicAudit"
    | "exploitSimulation"
    | "infraResilience"
    | "training"
    | "incidentResponse";
  Icon: LucideIcon;
};

/**
 * Static, non-translatable service metadata. Copy (eyebrow, body, features,
 * builtFor) lives in messages/*.json under "Services".
 */
export const SERVICES: ServiceMeta[] = [
  { id: "platformPentest", Icon: Terminal },
  { id: "gameLogicAudit", Icon: Bug },
  { id: "exploitSimulation", Icon: Crosshair },
  { id: "infraResilience", Icon: Gauge },
  { id: "training", Icon: GraduationCap },
  { id: "incidentResponse", Icon: ShieldAlert },
];
