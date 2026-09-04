export const demoPortfolio = {
  totalValue: 24842.31,
  change24h: 5.45,
  pnl24h: 1284.22,
  solBalance: 46.12,
  solBalanceUsd: 8412.44,
  assets: [
    { symbol: "SOL", name: "Solana", price: 182.42, holdings: 46.12, value: 8412, change24h: 4.82 },
    { symbol: "JUP", name: "Jupiter", price: 1.12, holdings: 3750, value: 4200, change24h: 8.31 },
    { symbol: "RAY", name: "Raydium", price: 4.21, holdings: 410, value: 1726, change24h: 5.12 },
    { symbol: "BONK", name: "Bonk", price: 0.00003, holdings: 40133333, value: 1204, change24h: -2.14 },
  ],
  chart: {
    "1D": [22.1, 22.4, 22.3, 23.0, 23.4, 23.2, 23.8, 24.1, 24.0, 24.5, 24.8, 24.84],
    "1W": [21.2, 22.0, 21.8, 22.9, 23.5, 24.1, 24.84],
    "1M": [19.8, 20.5, 21.0, 20.7, 22.1, 23.0, 22.6, 23.9, 24.2, 24.84],
  },
};

export const demoMarket = {
  tokens: [
    { symbol: "SOL", price: 182.42, change24h: 4.82 },
    { symbol: "JUP", price: 1.12, change24h: 8.31 },
    { symbol: "RAY", price: 4.21, change24h: 5.12 },
    { symbol: "BONK", price: 0.00003, change24h: -2.14 },
  ],
  solMarketCap: 86400000000,
  solVolume24h: 4820000000,
};

export const demoWatchlist = [
  { symbol: "JUP", price: 1.12, change24h: 8.31, watched: true },
  { symbol: "RAY", price: 4.21, change24h: 5.12, watched: true },
  { symbol: "PYTH", price: 0.42, change24h: 3.82, watched: true },
  { symbol: "WIF", price: 0.87, change24h: -1.42, watched: true },
];

export const demoActivity = [
  { id: 1, type: "Received", asset: "SOL", amount: "+2.40 SOL", timestamp: "12 min ago", status: "confirmed" },
  { id: 2, type: "Swapped", asset: "JUP → SOL", amount: "1,200 JUP → 6.4 SOL", timestamp: "42 min ago", status: "confirmed" },
  { id: 3, type: "Sent", asset: "SOL", amount: "-0.82 SOL", timestamp: "2 hrs ago", status: "confirmed" },
  { id: 4, type: "Received", asset: "BONK", amount: "+5,000 BONK", timestamp: "4 hrs ago", status: "pending" },
];

export const demoAllocation = [
  { symbol: "SOL", percent: 42 },
  { symbol: "JUP", percent: 21 },
  { symbol: "RAY", percent: 12 },
  { symbol: "BONK", percent: 8 },
  { symbol: "Other", percent: 17 },
];

export const demoMarketPulse = {
  btcDominance: 54.2,
  totalMarketCap: 2310000000000,
  fearGreedIndex: 68,
  fearGreedLabel: "Greed",
  altcoinIndex: 38,
  altcoinLabel: "Bitcoin Season",
};

export const demoTokenTransactions = [
  { id: 1, side: "buy", amount: "1,200 tokens", value: "$412.50", timestamp: "2 min ago" },
  { id: 2, side: "sell", amount: "480 tokens", value: "$165.20", timestamp: "6 min ago" },
  { id: 3, side: "buy", amount: "3,050 tokens", value: "$1,048.90", timestamp: "14 min ago" },
  { id: 4, side: "sell", amount: "820 tokens", value: "$282.40", timestamp: "21 min ago" },
];

export const demoTransactions = [
  { id: 1, type: "Received", asset: "SOL", amount: "+2.40 SOL", usdValue: "$237.24", timestamp: "12 min ago", status: "confirmed" },
  { id: 2, type: "Swapped", asset: "JUP → SOL", amount: "1,200 JUP → 6.4 SOL", usdValue: "$260.40", timestamp: "42 min ago", status: "confirmed" },
  { id: 3, type: "Sent", asset: "SOL", amount: "-0.82 SOL", usdValue: "$81.34", timestamp: "2 hrs ago", status: "confirmed" },
  { id: 4, type: "Received", asset: "BONK", amount: "+5,000 BONK", usdValue: "$0.15", timestamp: "4 hrs ago", status: "pending" },
  { id: 5, type: "Swapped", asset: "RAY → USDC", amount: "80 RAY → 64.5 USDC", usdValue: "$64.50", timestamp: "6 hrs ago", status: "confirmed" },
  { id: 6, type: "Sent", asset: "JUP", amount: "-500 JUP", usdValue: "$108.50", timestamp: "9 hrs ago", status: "failed" },
  { id: 7, type: "Received", asset: "SOL", amount: "+1.10 SOL", usdValue: "$108.68", timestamp: "1 day ago", status: "confirmed" },
  { id: 8, type: "Swapped", asset: "SOL → JUP", amount: "2.0 SOL → 380 JUP", usdValue: "$198.20", timestamp: "1 day ago", status: "confirmed" },
];
