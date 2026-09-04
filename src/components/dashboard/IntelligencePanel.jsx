import { Skeleton } from "../ui/Skeleton";

export default function IntelligencePanel({ data, market, loading }) {
  if (loading) {
    return (
      <div className="md:h-full md:flex md:flex-col">
        <Skeleton className="h-3 w-24 mb-2" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  const signals = [];

  const biggestMover = [...data.assets].sort(
    (a, b) => Math.abs(b.change24h) - Math.abs(a.change24h)
  )[0];
  if (biggestMover) {
    const direction = biggestMover.change24h >= 0 ? "increased" : "decreased";
    signals.push(
      `${biggestMover.symbol} ${direction} ${Math.abs(biggestMover.change24h)}% in the last 24h`
    );
  }

  if (market?.tokens) {
    const topVolumeMover = [...market.tokens].sort((a, b) => b.change24h - a.change24h)[0];
    if (topVolumeMover) {
      signals.push(`${topVolumeMover.symbol} is the top mover across tracked markets today`);
    }
  }

  signals.push(
    `Your portfolio is ${data.change24h >= 0 ? "up" : "down"} ${Math.abs(data.change24h)}% today`
  );

  if (signals.length === 0) return null;

  return (
    <div className="md:h-full md:flex md:flex-col">
      <div className="text-sm text-white/50 tracking-wide mb-2">Intelligence</div>
      <div className="bg-white/4 border border-white/10 rounded-xl p-3 space-y-2 flex-1">
        {signals.map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-white/70">
            <span className="text-teal-400 mt-0.5">●</span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
