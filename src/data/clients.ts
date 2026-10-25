export type Client = {
  name: string;
  /** path under /public */
  logo: string;
};

/**
 * Only clients who explicitly authorized public logo use. Empty until the
 * team confirms who can be listed.
 */
export const CLIENTS: Client[] = [];
