import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { Skeleton } from "../components/ui/Skeleton";
import { ErrorState } from "../components/ui/ErrorState";
import { useWatchlist } from "../hooks/useWatchlist";

function fmtPrice(p) {
  if (p < 0.01) return `$${p.toFixed(6)}`;
  return `$${p.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
}

export default function WatchlistPage() {
  const { tokens, loading, error, refetch, toggle } = useWatchlist();
  const watched = tokens.filter((t) => t.watched);

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl mx-auto">
        <div className="text-xl text-white font-semibold">Watchlist</div>
        <div className="text-sm text-white/40 mt-0.5 mb-6">
          Tokens you're tracking, with live prices
        </div>

        <div className="bg-white/4 border border-white/10 rounded-xl overflow-hidden">
          {error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center px-4 py-3 border-b border-white/6 last:border-0">
                <Skeleton className="h-4 w-4 mr-3" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-14 ml-auto" />
              </div>
            ))
          ) : watched.length === 0 ? (
            <div className="text-center py-14 px-4">
              <p className="text-sm text-white/50 mb-1">Nothing watched yet</p>
              <p className="text-xs text-white/30 mb-4">
                Star tokens from Markets or your Dashboard to track them here.
              </p>
              <Link
                to="/app/markets"
                className="text-sm text-teal-300 border border-teal-400/25 bg-teal-400/10 px-4 py-2 rounded-full hover:bg-teal-400/15 transition-colors"
              >
                Browse markets
              </Link>
            </div>
          ) : (
            watched.map((t) => {
              const positive = t.change24h >= 0;
              return (
                <div
                  key={t.symbol}
                  className="flex items-center px-4 py-3 border-b border-white/6 last:border-0"
                >
                  <button
                    onClick={() => toggle(t.symbol)}
                    aria-label={`Remove ${t.symbol} from watchlist`}
                    className="text-teal-400 mr-3"
                  >
                    ★
                  </button>
                  <Link
                    to={`/token/${t.symbol}`}
                    className="flex-1 flex items-center justify-between hover:opacity-80 transition-opacity"
                  >
                    <span className="text-sm text-white font-medium">{t.symbol}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-white/70 tabular-nums">{fmtPrice(t.price)}</span>
                      <span
                        className={`text-[12px] w-16 text-right tabular-nums ${
                          positive ? "text-teal-400" : "text-red-400"
                        }`}
                      >
                        {positive ? "▲" : "▼"} {Math.abs(t.change24h)}%
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppShell>
  );
}
