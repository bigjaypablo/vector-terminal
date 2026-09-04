import { useState, useCallback } from "react";
import { getWalletOverview } from "../services/solanaApi";
import { fetchJupiterPrices } from "../services/jupiterApi";
import { symbolForMint } from "../services/jupiterApi";

export function useWalletLookup() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lookup = useCallback(async (address) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const overview = await getWalletOverview(address.trim());

      const knownTokens = overview.tokens
        .map((t) => ({ ...t, symbol: symbolForMint(t.mint) }))
        .filter((t) => t.symbol);

      const symbols = ["SOL", ...knownTokens.map((t) => t.symbol)];
      const prices = await fetchJupiterPrices(symbols);

      const solPrice = prices.SOL?.price ?? 0;
      const solValue = overview.solBalance * solPrice;

      const enrichedTokens = knownTokens.map((t) => ({
        ...t,
        price: prices[t.symbol]?.price ?? 0,
        change24h: prices[t.symbol]?.change24h ?? 0,
        value: t.amount * (prices[t.symbol]?.price ?? 0),
      }));

      const unknownCount = overview.tokens.length - knownTokens.length;

      setData({
        address: address.trim(),
        solBalance: overview.solBalance,
        solValue,
        tokens: enrichedTokens,
        unknownCount,
        totalValue: solValue + enrichedTokens.reduce((sum, t) => sum + t.value, 0),
      });
    } catch (err) {
      setError(err.message || "Unable to look up this wallet");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, lookup };
}
