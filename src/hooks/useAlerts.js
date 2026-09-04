import { useMemo } from "react";
import { usePortfolio } from "./usePortfolio";
import { useMarketData } from "./useMarketData";

const MOVE_THRESHOLD = 5;

export function useAlerts() {
  const { data: portfolio, loading: portfolioLoading } = usePortfolio();
  const { data: market, loading: marketLoading } = useMarketData();

  const alerts = useMemo(() => {
    if (!portfolio || !market) return [];

    const list = [];

    portfolio.assets.forEach((a) => {
      if (Math.abs(a.change24h) >= MOVE_THRESHOLD) {
        list.push({
          id: `asset-${a.symbol}`,
          text: `${a.symbol} ${a.change24h >= 0 ? "up" : "down"} ${Math.abs(a.change24h)}% today`,
          positive: a.change24h >= 0,
        });
      }
    });

    market.tokens.forEach((t) => {
      if (Math.abs(t.change24h) >= MOVE_THRESHOLD) {
        list.push({
          id: `market-${t.symbol}`,
          text: `${t.symbol} moved ${t.change24h >= 0 ? "+" : ""}${t.change24h}% in the market`,
          positive: t.change24h >= 0,
        });
      }
    });

    if (Math.abs(portfolio.change24h) >= 3) {
      list.push({
        id: "portfolio-move",
        text: `Your portfolio is ${portfolio.change24h >= 0 ? "up" : "down"} ${Math.abs(
          portfolio.change24h
        )}% today`,
        positive: portfolio.change24h >= 0,
      });
    }

    return list;
  }, [portfolio, market]);

  return { alerts, loading: portfolioLoading || marketLoading };
}
