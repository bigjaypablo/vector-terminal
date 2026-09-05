import { demoPortfolio } from "../data/demoData";
import { getWalletOverview } from "./solanaApi";
import { fetchJupiterPrices, symbolForMint } from "./jupiterApi";

const KNOWN_NAMES = {
  SOL: "Solana",
  JUP: "Jupiter",
  RAY: "Raydium",
  BONK: "Bonk",
  PYTH: "Pyth Network",
  WIF: "dogwifhat",
};

export async function getPortfolio(address) {
  if (!address) throw new Error("No wallet connected");

  const overview = await getWalletOverview(address);

  const knownTokens = overview.tokens
    .map((t) => ({ ...t, symbol: symbolForMint(t.mint) }))
    .filter((t) => t.symbol);

  const symbols = ["SOL", ...knownTokens.map((t) => t.symbol)];
  const prices = await fetchJupiterPrices(symbols);

  const solPrice = prices.SOL?.price ?? 0;
  const solValue = overview.solBalance * solPrice;

  const assets = [
    {
      symbol: "SOL",
      name: "Solana",
      price: solPrice,
      holdings: overview.solBalance,
      value: Number(solValue.toFixed(2)),
      change24h: prices.SOL?.change24h ?? 0,
    },
    ...knownTokens.map((t) => {
      const price = prices[t.symbol]?.price ?? 0;
      const change24h = prices[t.symbol]?.change24h ?? 0;
      return {
        symbol: t.symbol,
        name: KNOWN_NAMES[t.symbol] || t.symbol,
        price,
        holdings: t.amount,
        value: Number((t.amount * price).toFixed(2)),
        change24h,
      };
    }),
  ];

  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
  const previousValue = assets.reduce((sum, a) => sum + a.value / (1 + a.change24h / 100), 0);
  const pnl24h = Number((totalValue - previousValue).toFixed(2));
  const change24h =
    previousValue > 0 ? Number((((totalValue - previousValue) / previousValue) * 100).toFixed(2)) : 0;

  return {
    totalValue: Number(totalValue.toFixed(2)),
    change24h,
    pnl24h,
    solBalance: overview.solBalance,
    solBalanceUsd: Number(solValue.toFixed(2)),
    assets,
    unknownTokenCount: overview.tokens.length - knownTokens.length,
    // Historical series stays illustrative — no free source for real historical portfolio value
    chart: demoPortfolio.chart,
  };
}
