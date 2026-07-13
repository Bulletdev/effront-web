import { Fragment } from "react";

/**
 * Renders a block of copy with each sentence on its own line — project pattern
 * for statement/lede text, so a new sentence never continues on the same line
 * after a full stop. The split fires on a period followed by whitespace, so
 * dotted names like `scrims.lol` or `peneira.gg` (no space after the dot) stay
 * intact.
 */
export function Statement({ text, className }: { text: string; className?: string }) {
  const lines = text.split(/(?<=\.)\s+/).filter(Boolean);
  return (
    <p className={className}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  );
}

/**
 * Same sentence-per-line rule for copy that carries inline markup and is
 * rendered through dangerouslySetInnerHTML (e.g. hero text with <b>/<gold>).
 * Inserts a <br /> after each full stop that is followed by whitespace, leaving
 * dotted names and existing tags untouched.
 */
export function withSentenceBreaks(html: string): string {
  return html.replace(/(?<=\.)\s+/g, "<br />");
}
