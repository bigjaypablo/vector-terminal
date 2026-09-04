import AppShell from "../components/layout/AppShell";
import PortfolioOverview from "../components/dashboard/PortfolioOverview";
import PortfolioMetrics from "../components/dashboard/PortfolioMetrics";
import MarketPulse from "../components/dashboard/MarketPulse";
import TrendingNow from "../components/dashboard/TrendingNow";
import AssetTable from "../components/dashboard/AssetTable";
import MarketOverview from "../components/dashboard/MarketOverview";
import Watchlist from "../components/dashboard/Watchlist";
import RecentActivity from "../components/dashboard/RecentActivity";
import PortfolioAllocation from "../components/dashboard/PortfolioAllocation";
import IntelligencePanel from "../components/dashboard/IntelligencePanel";
import ConnectPrompt from "../components/dashboard/ConnectPrompt";
import { usePortfolio } from "../hooks/usePortfolio";
import { useMarketData } from "../hooks/useMarketData";
import { useMarketPulse } from "../hooks/useMarketPulse";
import { useTrending } from "../hooks/useTrending";
import { useWatchlist } from "../hooks/useWatchlist";
import { useRecentActivity } from "../hooks/useRecentActivity";
import { useWallet } from "../context/WalletContext";

export default function Dashboard() {
  const { connected } = useWallet();
  const { data, loading, error, refetch } = usePortfolio();
  const market = useMarketData();
  const pulse = useMarketPulse();
  const trending = useTrending();
  const watchlist = useWatchlist();
  const activity = useRecentActivity();

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="text-xl text-white font-semibold">Good morning, Trader</div>
        <div className="text-sm text-white/40 mt-0.5 mb-6">Your Solana intelligence overview</div>

        <div className="flex flex-col gap-6 lg:gap-8">
          <MarketPulse
            data={pulse.data}
            loading={pulse.loading}
            error={pulse.error}
            onRetry={pulse.refetch}
          />

          <TrendingNow
            tokens={trending.tokens}
            loading={trending.loading}
            error={trending.error}
            onRetry={trending.refetch}
          />

          {!connected ? (
            <ConnectPrompt />
          ) : (
            <>
              <PortfolioOverview data={data} loading={loading} error={error} onRetry={refetch} />
              {!error && <PortfolioMetrics data={data} loading={loading} />}

              <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-6 lg:gap-8 md:items-stretch">
                <AssetTable assets={data?.assets || []} loading={loading} />
                <MarketOverview
                  data={market.data}
                  loading={market.loading}
                  error={market.error}
                  onRetry={market.refetch}
                />
              </div>

              <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-6 lg:gap-8 md:items-stretch">
                <Watchlist
                  tokens={watchlist.tokens}
                  loading={watchlist.loading}
                  error={watchlist.error}
                  onRetry={watchlist.refetch}
                  onToggle={watchlist.toggle}
                />
                <RecentActivity
                  data={activity.data}
                  loading={activity.loading}
                  error={activity.error}
                  onRetry={activity.refetch}
                />
              </div>

              {!error && (
                <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-6 lg:gap-8 md:items-stretch">
                  <PortfolioAllocation
                    assets={data?.assets || []}
                    totalValue={data?.totalValue}
                    loading={loading}
                  />
                  <IntelligencePanel data={data} market={market.data} loading={loading} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
