import { CREDENTIALS, type Credential } from "@/data/credentials";

function CredentialBody({ credential }: { credential: Credential }) {
  return (
    <>
      <span className="vg-cat">{credential.org}</span>
      <h3 className="mt-2 text-[17px] font-bold tracking-[-0.02em]">{credential.ref}</h3>
      <p className="mt-2 text-[14px] leading-[1.55] text-(--muted-fg)">{credential.description}</p>
    </>
  );
}

/** Renders nothing until CREDENTIALS has real, verified entries. */
export function Credentials({ heading, intro }: { heading: string; intro: string }) {
  if (CREDENTIALS.length === 0) return null;

  return (
    <>
      <div className="cap-head">
        <h2>{heading}</h2>
        <p>{intro}</p>
      </div>
      <div className="g3 mt-10 grid">
        {CREDENTIALS.map((c) =>
          c.url ? (
            <a
              key={c.ref}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-pad card-interactive"
            >
              <CredentialBody credential={c} />
            </a>
          ) : (
            <div key={c.ref} className="card card-pad">
              <CredentialBody credential={c} />
            </div>
          ),
        )}
      </div>
    </>
  );
}
