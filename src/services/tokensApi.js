const BASE = "https://api.jup.ag/tokens/v2";

function normalize(t) {
  return {
    id: t.id,
    symbol: t.symbol,
    name: t.name,
    icon: t.icon || null,
    price: t.usdPrice ?? 0,
    change24h: Number((t.stats24h?.priceChange ?? 0).toFixed(2)),
    mcap: t.mcap ?? null,
  };
}

export async function getTopTokens({ category = "toptraded", interval = "24h", limit = 100 } = {}) {
  const res = await fetch(`${BASE}/${category}/${interval}?limit=${limit}`);
  if (!res.ok) throw new Error(`Jupiter tokens API returned ${res.status}`);
  const json = await res.json();
  return json.map(normalize);
}

export async function searchTokens(query) {
  if (!query.trim()) return [];
  const res = await fetch(`${BASE}/search?query=${encodeURIComponent(query.trim())}`);
  if (!res.ok) throw new Error(`Jupiter search API returned ${res.status}`);
  const json = await res.json();
  return json.map(normalize);
}

export async function getTokenBySymbol(symbol) {
  const results = await searchTokens(symbol);
  const exact = results.find((t) => t.symbol?.toUpperCase() === symbol.toUpperCase());
  const token = exact || results[0];
  if (!token) throw new Error(`Token ${symbol} not found`);

  let liquidity = null;
  try {
    const priceRes = await fetch(`https://api.jup.ag/price/v3?ids=${token.id}`);
    if (priceRes.ok) {
      const priceJson = await priceRes.json();
      liquidity = priceJson[token.id]?.liquidity ?? null;
    }
  } catch {
    // liquidity is a nice-to-have; token page still works without it
  }

  return { ...token, liquidity };
}
