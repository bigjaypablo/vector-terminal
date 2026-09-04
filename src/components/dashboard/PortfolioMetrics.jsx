import { Skeleton } from "../ui/Skeleton";

export default function PortfolioMetrics({ data, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  const positive = data.change24h >= 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      <div className="bg-white/4 rounded-lg p-3">
        <div className="text-[12px] text-white/40 tracking-wide">TOTAL BALANCE</div>
        <div className="text-sm text-white font-semibold mt-0.5 tabular-nums">
          ${data.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
        <div className={`text-[12px] mt-0.5 ${positive ? "text-teal-400" : "text-red-400"}`}>
          {positive ? "▲" : "▼"} {Math.abs(data.change24h)}%
        </div>
      </div>

      <div className="bg-white/4 rounded-lg p-3">
        <div className="text-[12px] text-white/40 tracking-wide">24H P&L</div>
        <div className="text-sm text-teal-400 font-semibold mt-0.5 tabular-nums">
          +${data.pnl24h.toLocaleString()}
        </div>
      </div>

      <div className="bg-white/4 rounded-lg p-3">
        <div className="text-[12px] text-white/40 tracking-wide">ASSETS</div>
        <div className="text-sm text-white font-medium mt-0.5">{data.assets.length} tokens</div>
      </div>

      <div className="bg-white/4 rounded-lg p-3">
        <div className="text-[12px] text-white/40 tracking-wide">SOL BALANCE</div>
        <div className="text-sm text-white font-semibold mt-0.5 tabular-nums">
          {data.solBalance} SOL
        </div>
        <div className="text-[12px] text-white/40 mt-0.5 tabular-nums">
          ${data.solBalanceUsd.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
