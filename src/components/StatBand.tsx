export type Stat = {
  value: string;
  label: string;
  note?: string;
};

/** Row of big, verifiable numbers — no counter animation, static values only. */
export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <div className="stat-band">
      {stats.map((s, i) => (
        <div className="stat" key={i}>
          <span className="num">{s.value}</span>
          <span className="lbl">{s.note ? `${s.label} · ${s.note}` : s.label}</span>
        </div>
      ))}
    </div>
  );
}
