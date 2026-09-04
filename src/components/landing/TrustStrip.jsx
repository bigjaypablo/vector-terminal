import { useCountUp } from "../../hooks/useCountUp";

const stats = [
  { label: "24H volume", value: 9.8, prefix: "$", suffix: "B" },
  { label: "Wallets tracked", value: 2.5, prefix: "", suffix: "M" },
  { label: "Tokens indexed", value: 28, prefix: "", suffix: "k" },
];

function Stat({ label, value, prefix, suffix }) {
  const [ref, count] = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-center px-8 py-2">
      <div className="text-2xl font-medium text-white tabular-nums">
        {prefix}{count.toFixed(value % 1 !== 0 ? 1 : 0)}{suffix}
      </div>
      <div className="text-xs text-white/40 mt-1">{label}</div>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <div className="bg-[#0a0a0a] shrink-0 pb-6">
      <div className="flex items-center justify-center divide-x divide-white/10">
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}
