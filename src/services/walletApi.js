import { demoWatchlist, demoActivity } from "../data/demoData";
import { fetchJupiterPrices } from "./jupiterApi";

export async function getWatchlist() {
  const symbols = demoWatchlist.map((t) => t.symbol);
  const prices = await fetchJupiterPrices(symbols);

  return demoWatchlist.map((token) => {
    const live = prices[token.symbol];
    return {
      ...token,
      price: live?.price ?? token.price,
      change24h: live?.change24h ?? token.change24h,
    };
  });
}

export async function getRecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 450));
  return demoActivity;
}
