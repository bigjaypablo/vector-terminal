import { Link } from "react-router-dom";
import { Skeleton } from "../ui/Skeleton";
import { ErrorState } from "../ui/ErrorState";

export default function Watchlist({ tokens, loading, error, onRetry, onToggle }) {
  return (
    <div className="md:h-full md:flex md:flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/50 tracking-wide">Watchlist</span>
        <Link to="/app/watchlist" className="text-[12px] text-teal-400/80 hover:text-teal-300">
          View all
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
        ) : tokens.length === 0 ? (
          <p className="text-sm text-white/35 text-center py-4">No tokens watched yet</p>
        ) : (
          <div className="space-y-1.5">
            {tokens.map((t) => {
              const positive = t.change24h >= 0;
              return (
                <div key={t.symbol} className="flex items-center justify-between text-sm">
                  <button
                    onClick={() => onToggle(t.symbol)}
                    aria-label={t.watched ? `Remove ${t.symbol} from watchlist` : `Add ${t.symbol} to watchlist`}
                    className={`text-sm mr-2 ${t.watched ? "text-teal-400" : "text-white/20"}`}
                  >
                    ★
                  </button>
                  <span className="text-white/70 font-medium flex-1">{t.symbol}</span>
                  <span className="text-white/50 tabular-nums mr-3">${t.price.toLocaleString()}</span>
                  <span className={`tabular-nums ${positive ? "text-teal-400" : "text-red-400"}`}>
                    {positive ? "▲" : "▼"} {Math.abs(t.change24h)}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
