import { demoMarketPulse } from "../data/demoData";

export async function getMarketPulse() {
  const [globalRes, fngRes] = await Promise.all([
    fetch("https://api.coingecko.com/api/v3/global"),
    fetch("https://api.alternative.me/fng/?limit=1"),
  ]);

  if (!globalRes.ok) throw new Error(`CoinGecko global API returned ${globalRes.status}`);
  if (!fngRes.ok) throw new Error(`Fear & Greed API returned ${fngRes.status}`);

  const globalJson = await globalRes.json();
  const fngJson = await fngRes.json();

  const btcDominance = Number(globalJson.data.market_cap_percentage.btc.toFixed(1));
  const totalMarketCap = globalJson.data.total_market_cap.usd;

  const fngValue = Number(fngJson.data[0].value);
  const fngLabel = fngJson.data[0].value_classification;

  return {
    btcDominance,
    totalMarketCap,
    fearGreedIndex: fngValue,
    fearGreedLabel: fngLabel,
    // No free published source exists for this — kept as clearly-labeled demo data
    altcoinIndex: demoMarketPulse.altcoinIndex,
    altcoinLabel: demoMarketPulse.altcoinLabel,
  };
}
