import type { IconName } from "@/components/Icon";

export type ServiceMeta = {
  id:
    | "platformPentest"
    | "gameLogicAudit"
    | "exploitSimulation"
    | "infraResilience"
    | "training"
    | "incidentResponse";
  icon: IconName;
};

export const SERVICES: ServiceMeta[] = [
  { id: "platformPentest", icon: "terminal" },
  { id: "gameLogicAudit", icon: "bug" },
  { id: "exploitSimulation", icon: "crosshair" },
  { id: "infraResilience", icon: "gauge" },
  { id: "training", icon: "graduation-cap" },
  { id: "incidentResponse", icon: "shield-alert" },
];
