import { Link } from "react-router-dom";
import { Skeleton } from "../ui/Skeleton";
import { ErrorState } from "../ui/ErrorState";

function fmtCompact(n) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
}

export default function MarketOverview({ data, loading, error, onRetry }) {
  return (
    <div className="md:h-full md:flex md:flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/50 tracking-wide">Market overview</span>
        <Link to="/app/markets" className="text-[12px] text-teal-400/80 hover:text-teal-300">
          View markets
        </Link>
      </div>

      <div className="bg-white/4 border border-white/10 rounded-xl p-3 flex-1">
        {error ? (
          <ErrorState message={error} onRetry={onRetry} />
        ) : loading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-1.5">
              {data.tokens.map((t) => {
                const positive = t.change24h >= 0;
                return (
                  <div key={t.symbol} className="flex items-center justify-between text-sm">
                    <span className="text-white/70 font-medium">{t.symbol}</span>
                    <span className="text-white/50 tabular-nums">
                      {t.price < 0.01 ? `$${t.price.toFixed(6)}` : `$${t.price.toLocaleString()}`}
                    </span>
                    <span className={`tabular-nums ${positive ? "text-teal-400" : "text-red-400"}`}>
                      {positive ? "▲" : "▼"} {Math.abs(t.change24h)}%
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/8">
              <div>
                <div className="text-[12px] text-white/35">SOL market cap</div>
                <div className="text-sm text-white/80 mt-0.5">{fmtCompact(data.solMarketCap)}</div>
              </div>
              <div>
                <div className="text-[12px] text-white/35">24h volume</div>
                <div className="text-sm text-white/80 mt-0.5">{fmtCompact(data.solVolume24h)}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
