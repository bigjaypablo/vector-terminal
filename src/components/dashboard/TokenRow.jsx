import Sparkline from "./Sparkline";

export default function TokenRow({ token, onSelect, isActive }) {
  const positive = token.change24h >= 0;

  return (
    <button
      onClick={() => onSelect(token)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors
        ${isActive ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10 hover:bg-white/8"}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-sm font-semibold text-orange-400">
          {token.symbol[0]}
        </div>
        <div className="text-left">
          <div className="text-sm text-white/90 font-medium">{token.symbol}</div>
          <div className="text-sm text-white/40">{token.name}</div>
        </div>
      </div>

      <Sparkline data={token.sparkline} positive={positive} width={80} height={28} />

      <div className="text-right">
        <div className={`text-sm font-medium ${positive ? "text-teal-400" : "text-red-400"}`}>
          {positive ? "+" : "-"}${Math.abs(token.changeAmount).toLocaleString()}
        </div>
        <div className={`text-sm ${positive ? "text-teal-400/70" : "text-red-400/70"}`}>
          {positive ? "+" : ""}{token.change24h}%
        </div>
      </div>
    </button>
  );
}
