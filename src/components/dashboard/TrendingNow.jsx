import { Link } from "react-router-dom";
import { Skeleton } from "../ui/Skeleton";
import { ErrorState } from "../ui/ErrorState";

export default function TrendingNow({ tokens, loading, error, onRetry }) {
  if (error) {
    return (
      <div className="bg-white/4 border border-white/10 rounded-xl">
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div>
      <div className="text-sm text-white/50 tracking-wide mb-2">Trending now</div>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-20 shrink-0" />)
          : tokens.map((t) => {
              const positive = t.change24h >= 0;
              return (
                <Link
                  key={t.id}
                  to={`/token/${t.symbol}`}
                  className="shrink-0 bg-white/4 border border-white/10 rounded-lg px-3.5 py-2 hover:bg-white/8 transition-colors"
                >
                  <div className="text-[12px] text-white font-semibold">{t.symbol}</div>
                  <div className={`text-[11px] mt-0.5 ${positive ? "text-teal-400" : "text-red-400"}`}>
                    {positive ? "▲" : "▼"} {Math.abs(t.change24h)}%
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
