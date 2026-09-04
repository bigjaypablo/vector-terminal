import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import PortfolioChart from "../components/dashboard/PortfolioChart";
import { Skeleton } from "../components/ui/Skeleton";
import { ErrorState } from "../components/ui/ErrorState";
import { useToken } from "../hooks/useToken";
import { demoTokenTransactions } from "../data/demoData";

function fmtPrice(p) {
  if (p == null) return "—";
  if (p < 0.01) return `$${p.toFixed(6)}`;
  return `$${p.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
}

function fmtCompact(n) {
  if (n == null) return "Not available";
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
}

// Illustrative shape only — no free source provides real historical price series for arbitrary tokens
const placeholderChart = [1, 1.03, 0.98, 1.05, 1.1, 1.04, 1.12, 1.08, 1.15, 1.2];

export default function TokenIntelligence() {
  const { symbol } = useParams();
  const { data, loading, error, refetch } = useToken(symbol);
  const [watched, setWatched] = useState(false);

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl mx-auto">
        <Link to="/app/markets" className="text-[12px] text-white/40 hover:text-white/70">
          ← Back to markets
        </Link>

        {loading ? (
          <div className="mt-4 space-y-3">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : error ? (
          <div className="mt-4 bg-white/4 border border-white/10 rounded-xl">
            <ErrorState message={error} onRetry={refetch} />
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mt-4 mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {data.icon ? (
                  <img src={data.icon} alt="" className="w-11 h-11 rounded-full" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-white/8 flex items-center justify-center text-sm text-white/60">
                    {data.symbol?.[0]}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg text-white font-semibold">{data.symbol}</span>
                    {data.isVerified && (
                      <span className="text-[10px] text-teal-400 bg-teal-400/10 border border-teal-400/25 rounded-full px-1.5 py-0.5">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-white/40">{data.name}</div>
                </div>
              </div>

              <button
                onClick={() => setWatched((w) => !w)}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  watched
                    ? "text-teal-300 border-teal-400/30 bg-teal-400/10"
                    : "text-white/60 border-white/15 hover:bg-white/5"
                }`}
              >
                <span>{watched ? "★" : "☆"}</span>
                {watched ? "Watching" : "Add to watchlist"}
              </button>
            </div>

            <div className="bg-white/4 border border-white/10 rounded-xl p-4 md:p-6">
              <div className="text-3xl text-white font-semibold tabular-nums">{fmtPrice(data.price)}</div>
              <div
                className={`text-sm mt-0.5 ${data.change24h >= 0 ? "text-teal-400" : "text-red-400"}`}
              >
                {data.change24h >= 0 ? "▲" : "▼"} {Math.abs(data.change24h)}% (24h)
              </div>

              <div className="mt-3">
                <PortfolioChart data={placeholderChart} type="line" />
                <p className="text-[10px] text-white/25 mt-1">
                  Illustrative chart — real-time historical price series not available via free data sources
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/4 rounded-lg p-3">
                <div className="text-[11px] text-white/40 tracking-wide">MARKET CAP</div>
                <div className="text-sm text-white font-semibold mt-0.5">{fmtCompact(data.mcap)}</div>
              </div>
              <div className="bg-white/4 rounded-lg p-3">
                <div className="text-[11px] text-white/40 tracking-wide">LIQUIDITY</div>
                <div className="text-sm text-white font-semibold mt-0.5">{fmtCompact(data.liquidity)}</div>
              </div>
              <div className="bg-white/4 rounded-lg p-3">
                <div className="text-[11px] text-white/40 tracking-wide">HOLDERS</div>
                <div className="text-sm text-white font-semibold mt-0.5">
                  {data.holderCount != null ? data.holderCount.toLocaleString() : "Not available"}
                </div>
              </div>
              <div className="bg-white/4 rounded-lg p-3">
                <div className="text-[11px] text-white/40 tracking-wide">FDV</div>
                <div className="text-sm text-white/40 font-medium mt-0.5">Not available</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-white/50 tracking-wide mb-2">Recent activity</div>
              <p className="text-[10px] text-white/25 mb-2">Demo data — illustrative, not live transactions</p>
              <div className="bg-white/4 border border-white/10 rounded-xl divide-y divide-white/8">
                {demoTokenTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                          tx.side === "buy"
                            ? "text-teal-300 bg-teal-400/10"
                            : "text-red-300 bg-red-400/10"
                        }`}
                      >
                        {tx.side.toUpperCase()}
                      </span>
                      <span className="text-sm text-white/80">{tx.amount}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/80 tabular-nums">{tx.value}</div>
                      <div className="text-[10px] text-white/35">{tx.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
