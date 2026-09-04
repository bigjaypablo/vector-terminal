import { Link } from "react-router-dom";
import { Skeleton } from "../ui/Skeleton";

function fmtPrice(p) {
  return p < 0.01 ? `$${p.toFixed(6)}` : `$${p.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

export default function AssetTable({ assets, loading }) {
  return (
    <div className="md:h-full md:flex md:flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/50 tracking-wide">Your assets</span>
        <Link to="/app/portfolio" className="text-[12px] text-teal-400/80 hover:text-teal-300">
          View all
        </Link>
      </div>

      <div className="bg-white/4 border border-white/10 rounded-xl divide-y divide-white/8 flex-1">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2.5">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))
          : assets.map((asset) => {
              const positive = asset.change24h >= 0;
              return (
                <Link
                  key={asset.symbol}
                  to={`/token/${asset.symbol}`}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center text-[12px] font-medium text-white/70">
                      {asset.symbol[0]}
                    </div>
                    <div>
                      <div className="text-sm text-white/90 font-medium">{asset.symbol}</div>
                      <div className="text-[12px] text-white/35">{fmtPrice(asset.price)}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-white/90 tabular-nums">
                      ${asset.value.toLocaleString()}
                    </div>
                    <div className={`text-[12px] tabular-nums ${positive ? "text-teal-400" : "text-red-400"}`}>
                      {positive ? "▲" : "▼"} {Math.abs(asset.change24h)}%
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
