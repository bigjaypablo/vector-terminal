import AppShell from "../components/layout/AppShell";
import PortfolioOverview from "../components/dashboard/PortfolioOverview";
import PortfolioMetrics from "../components/dashboard/PortfolioMetrics";
import PortfolioAllocation from "../components/dashboard/PortfolioAllocation";
import { Skeleton } from "../components/ui/Skeleton";
import { ErrorState } from "../components/ui/ErrorState";
import { usePortfolio } from "../hooks/usePortfolio";
import { useRecentActivity } from "../hooks/useRecentActivity";

const statusStyle = {
  confirmed: "text-teal-400",
  pending: "text-amber-400",
  failed: "text-red-400",
};

function fmtPrice(p) {
  if (p < 0.01) return `$${p.toFixed(6)}`;
  return `$${p.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
}

export default function Portfolio() {
  const { data, loading, error, refetch } = usePortfolio();
  const activity = useRecentActivity();

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <div className="text-xl text-white font-semibold">Portfolio</div>
        <div className="text-sm text-white/40 mt-0.5 mb-6">
          Full holdings, performance, and transaction history
        </div>

        <div className="flex flex-col gap-6 lg:gap-8">
          <PortfolioOverview data={data} loading={loading} error={error} onRetry={refetch} />
          {!error && <PortfolioMetrics data={data} loading={loading} />}

          {!error && (
            <div>
              <div className="text-sm text-white/50 tracking-wide mb-2">All holdings</div>
              <div className="bg-white/4 border border-white/10 rounded-xl overflow-hidden">
                <div className="flex items-center px-4 py-2 border-b border-white/8 text-[11px] text-white/35">
                  <span className="flex-[2]">ASSET</span>
                  <span className="flex-1 text-right">PRICE</span>
                  <span className="flex-1 text-right">HOLDINGS</span>
                  <span className="flex-1 text-right">VALUE</span>
                  <span className="w-16 text-right ml-2">24H</span>
                </div>

                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center px-4 py-3 border-b border-white/6 last:border-0">
                        <Skeleton className="h-7 w-7 rounded-full" />
                        <Skeleton className="h-3 w-20 ml-3" />
                      </div>
                    ))
                  : data.assets.map((asset) => {
                      const positive = asset.change24h >= 0;
                      return (
                        <div
                          key={asset.symbol}
                          className="flex items-center px-4 py-3 border-b border-white/6 last:border-0"
                        >
                          <div className="flex-[2] flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center text-[10px] font-medium text-white/70">
                              {asset.symbol[0]}
                            </div>
                            <span className="text-sm text-white font-medium">{asset.symbol}</span>
                          </div>
                          <span className="flex-1 text-right text-sm text-white/70 tabular-nums">
                            {fmtPrice(asset.price)}
                          </span>
                          <span className="flex-1 text-right text-sm text-white/60 tabular-nums">
                            {asset.holdings.toLocaleString()}
                          </span>
                          <span className="flex-1 text-right text-sm text-white font-medium tabular-nums">
                            ${asset.value.toLocaleString()}
                          </span>
                          <span
                            className={`w-16 text-right ml-2 text-[12px] tabular-nums ${
                              positive ? "text-teal-400" : "text-red-400"
                            }`}
                          >
                            {positive ? "▲" : "▼"} {Math.abs(asset.change24h)}%
                          </span>
                        </div>
                      );
                    })}
              </div>
            </div>
          )}

          {!error && (
            <PortfolioAllocation assets={data?.assets || []} totalValue={data?.totalValue} loading={loading} />
          )}

          <div>
            <div className="text-sm text-white/50 tracking-wide mb-2">Transaction history</div>
            <p className="text-[10px] text-white/25 mb-2">Demo data — illustrative, not live transactions</p>
            <div className="bg-white/4 border border-white/10 rounded-xl divide-y divide-white/8">
              {activity.error ? (
                <ErrorState message={activity.error} onRetry={activity.refetch} />
              ) : activity.loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="px-4 py-3">
                    <Skeleton className="h-3 w-32 mb-1" />
                    <Skeleton className="h-2.5 w-20" />
                  </div>
                ))
              ) : (
                activity.data.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <div className="text-sm text-white/90 font-medium">{tx.type}</div>
                      <div className="text-[12px] text-white/40 mt-0.5">
                        {tx.amount} · {tx.timestamp}
                      </div>
                    </div>
                    <span className={`text-[12px] font-medium ${statusStyle[tx.status]}`}>
                      {tx.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
