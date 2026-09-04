import { demoPortfolio } from "../data/demoData";
import { fetchJupiterPrices } from "./jupiterApi";

export async function getPortfolio() {
  const symbols = demoPortfolio.assets.map((a) => a.symbol);
  const prices = await fetchJupiterPrices(symbols);

  let totalValue = 0;
  let previousValue = 0;

  const assets = demoPortfolio.assets.map((asset) => {
    const live = prices[asset.symbol];
    const price = live?.price ?? asset.price;
    const change24h = live?.change24h ?? asset.change24h;
    const value = Number((asset.holdings * price).toFixed(2));

    totalValue += value;
    previousValue += value / (1 + change24h / 100);

    return { ...asset, price, change24h, value };
  });

  const pnl24h = Number((totalValue - previousValue).toFixed(2));
  const change24h =
    previousValue > 0 ? Number((((totalValue - previousValue) / previousValue) * 100).toFixed(2)) : 0;

  const solPrice = prices.SOL?.price ?? demoPortfolio.solBalanceUsd / demoPortfolio.solBalance;

  return {
    ...demoPortfolio,
    assets,
    totalValue: Number(totalValue.toFixed(2)),
    pnl24h,
    change24h,
    solBalanceUsd: Number((demoPortfolio.solBalance * solPrice).toFixed(2)),
    // Historical series stays demo — Jupiter's price API only returns current price, no free history source available
    chart: demoPortfolio.chart,
  };
}
