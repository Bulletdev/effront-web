export type Credential = {
  /** organization/vendor affected, or the awarding body */
  org: string;
  /** CVE id, hall-of-fame year, or other public reference */
  ref: string;
  description: string;
  url?: string;
};

/**
 * Real, publicly disclosable findings only — never add a placeholder or
 * invented entry here. Empty until the team supplies verified data.
 */
export const CREDENTIALS: Credential[] = [];
