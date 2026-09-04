import { Skeleton } from "../ui/Skeleton";
import { ErrorState } from "../ui/ErrorState";

function fmtCompact(n) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  return `$${n.toLocaleString()}`;
}

const fgColors = ["#E24B4A", "#F0997B", "#EF9F27", "#97C459", "#5DCAA5"];

export default function MarketPulse({ data, loading, error, onRetry }) {
  if (error) {
    return (
      <div className="bg-white/4 border border-white/10 rounded-xl">
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20 col-span-2" />
        <Skeleton className="h-20 col-span-2" />
      </div>
    );
  }

  const fgColor = fgColors[Math.min(4, Math.floor(data.fearGreedIndex / 20))];
  const altColor = data.altcoinIndex >= 75 ? "#5DCAA5" : data.altcoinIndex <= 25 ? "#E24B4A" : "#EF9F27";

  return (
    <div>
      <div className="text-sm text-white/50 tracking-wide mb-2">Market pulse</div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/4 border border-white/10 rounded-xl p-3">
          <div className="text-[11px] text-white/40 tracking-wide">BTC DOMINANCE</div>
          <div className="text-lg text-white font-semibold mt-1 tabular-nums">
            {data.btcDominance}%
          </div>
        </div>

        <div className="bg-white/4 border border-white/10 rounded-xl p-3">
          <div className="text-[11px] text-white/40 tracking-wide">TOTAL MARKET CAP</div>
          <div className="text-lg text-white font-semibold mt-1 tabular-nums">
            {fmtCompact(data.totalMarketCap)}
          </div>
        </div>

        <div className="col-span-2 bg-white/4 border border-white/10 rounded-xl p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[11px] text-white/40 tracking-wide">FEAR &amp; GREED</div>
            <div className="text-[11px] font-medium" style={{ color: fgColor }}>
              {data.fearGreedLabel}
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-gradient-to-r from-[#E24B4A] via-[#EF9F27] to-[#5DCAA5] relative">
            <div
              className="absolute -top-0.5 w-0.5 h-2.5 bg-white rounded-sm"
              style={{ left: `${data.fearGreedIndex}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>Fear</span>
            <span className="tabular-nums">{data.fearGreedIndex}</span>
            <span>Greed</span>
          </div>
        </div>

        <div className="col-span-2 bg-white/4 border border-white/10 rounded-xl p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[11px] text-white/40 tracking-wide">ALTCOIN SEASON</div>
            <div className="text-[11px] font-medium" style={{ color: altColor }}>
              {data.altcoinLabel}
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-gradient-to-r from-[#E24B4A] via-[#EF9F27] to-[#5DCAA5] relative">
            <div
              className="absolute -top-0.5 w-0.5 h-2.5 bg-white rounded-sm"
              style={{ left: `${data.altcoinIndex}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>BTC szn</span>
            <span className="tabular-nums">{data.altcoinIndex}</span>
            <span>Alt szn</span>
          </div>
          <div className="text-[9px] text-white/20 mt-1.5">Demo data — no free source available</div>
        </div>
      </div>
    </div>
  );
}
