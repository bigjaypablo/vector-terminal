import { useState } from "react";
import PortfolioChart from "./PortfolioChart";
import { Skeleton } from "../ui/Skeleton";
import { ErrorState } from "../ui/ErrorState";

const timeframes = ["1D", "1W", "1M"];

export default function PortfolioOverview({ data, loading, error, onRetry }) {
  const [timeframe, setTimeframe] = useState("1D");
  const [chartType, setChartType] = useState("line");

  if (loading || !data) {
    return (
      <div className="bg-white/4 border border-white/10 rounded-xl p-4 md:p-6">
        <Skeleton className="h-3 w-24 mb-2" />
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-3 w-32 mb-4" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/4 border border-white/10 rounded-xl">
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    );
  }

  const positive = data.change24h >= 0;
  const chartData = data.chart[timeframe] || data.chart["1D"];

  return (
    <div className="bg-white/4 border border-white/10 rounded-xl p-4 md:p-6">
      <div className="flex justify-between items-start flex-wrap gap-2">
        <div>
          <div className="text-[11px] text-white/40 tracking-wide mb-1">PORTFOLIO VALUE</div>
          <div className="text-3xl text-white font-semibold tabular-nums">
            ${data.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className={`text-sm mt-0.5 ${positive ? "text-teal-400" : "text-red-400"}`}>
            {positive ? "▲" : "▼"} {positive ? "+" : ""}${Math.abs(data.pnl24h).toLocaleString()} ·{" "}
            {positive ? "+" : ""}
            {data.change24h}% today
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <div className="flex gap-0.5">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`text-sm px-2 py-1 rounded-md transition-colors ${
                  timeframe === tf
                    ? "text-teal-300 bg-teal-400/10"
                    : "text-white/35 hover:text-white/60"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex gap-0.5 bg-white/5 rounded-md p-0.5">
            <button
              onClick={() => setChartType("line")}
              aria-label="Line chart"
              className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                chartType === "line" ? "bg-teal-400/15 text-teal-300" : "text-white/35 hover:text-white/60"
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType("bar")}
              aria-label="Bar chart"
              className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                chartType === "bar" ? "bg-teal-400/15 text-teal-300" : "text-white/35 hover:text-white/60"
              }`}
            >
              Bar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <PortfolioChart data={chartData} type={chartType} />
      </div>
    </div>
  );
}
