export const TOKEN_MINTS = {
  SOL: "So11111111111111111111111111111111111111112",
  JUP: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
  RAY: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  PYTH: "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3",
  WIF: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
};

export async function fetchJupiterPrices(symbols) {
  const mintToSymbol = {};
  const ids = symbols
    .filter((s) => TOKEN_MINTS[s])
    .map((s) => {
      mintToSymbol[TOKEN_MINTS[s]] = s;
      return TOKEN_MINTS[s];
    })
    .join(",");

  if (!ids) return {};

  const res = await fetch(`https://api.jup.ag/price/v3?ids=${ids}`);
  if (!res.ok) {
    throw new Error(`Jupiter price API returned ${res.status}`);
  }

  const json = await res.json();
  const result = {};

  for (const [mint, info] of Object.entries(json)) {
    const symbol = mintToSymbol[mint];
    if (symbol) {
      result[symbol] = {
        price: info.usdPrice,
        change24h: Number((info.priceChange24h ?? 0).toFixed(2)),
      };
    }
  }

  return result;
}

export function symbolForMint(mint) {
  const entry = Object.entries(TOKEN_MINTS).find(([, m]) => m === mint);
  return entry ? entry[0] : null;
}
