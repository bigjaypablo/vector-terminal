import { demoMarket } from "../data/demoData";
import { fetchJupiterPrices, TOKEN_MINTS } from "./jupiterApi";

export async function getMarketOverview() {
  const prices = await fetchJupiterPrices(Object.keys(TOKEN_MINTS));

  const tokens = Object.keys(TOKEN_MINTS).map((symbol) => ({
    symbol,
    price: prices[symbol]?.price ?? 0,
    change24h: prices[symbol]?.change24h ?? 0,
  }));

  return {
    tokens,
    solMarketCap: demoMarket.solMarketCap,
    solVolume24h: demoMarket.solVolume24h,
  };
}

export { getMarketPulse } from "./marketPulseApi";
