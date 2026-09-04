import { useState, useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement, Tooltip } from "chart.js";
import { Skeleton } from "../ui/Skeleton";

Chart.register(DoughnutController, ArcElement, Tooltip);

const barColors = ["#5DCAA5", "#7F77DD", "#F0997B", "#ED93B1", "#888780"];

function DonutChart({ rows }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: rows.map((r) => r.symbol),
        datasets: [
          {
            data: rows.map((r) => r.percent),
            backgroundColor: rows.map((_, i) => barColors[i % barColors.length]),
            borderColor: "#0a0a0a",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#111",
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 1,
            bodyColor: "#fff",
            padding: 8,
            callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed.toFixed(0)}%` },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [rows]);

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24 shrink-0">
        <canvas ref={canvasRef} role="img" aria-label="Portfolio allocation donut chart" />
      </div>
      <div className="flex-1 space-y-1.5">
        {rows.map((row, i) => (
          <div key={row.symbol} className="flex items-center gap-2 text-[12px]">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: barColors[i % barColors.length] }}
            />
            <span className="text-white/70 font-medium">{row.symbol}</span>
            <span className="text-white/40 ml-auto tabular-nums">{row.percent.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioAllocation({ assets, totalValue, loading }) {
  const [view, setView] = useState("bars");

  if (loading) {
    return (
      <div className="mt-6 lg:mt-8">
        <Skeleton className="h-3 w-32 mb-2" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const rows = assets
    .map((a) => ({ symbol: a.symbol, percent: (a.value / totalValue) * 100 }))
    .sort((a, b) => b.percent - a.percent);

  const topRows = rows.slice(0, 4);
  const otherPercent = rows.slice(4).reduce((sum, r) => sum + r.percent, 0);
  const allRows = otherPercent > 0 ? [...topRows, { symbol: "Other", percent: otherPercent }] : topRows;

  return (
    <div className="md:h-full md:flex md:flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/50 tracking-wide">Portfolio allocation</span>
        <div className="flex gap-0.5 bg-white/5 rounded-md p-0.5">
          <button
            onClick={() => setView("bars")}
            className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
              view === "bars" ? "bg-teal-400/15 text-teal-300" : "text-white/35 hover:text-white/60"
            }`}
          >
            Bars
          </button>
          <button
            onClick={() => setView("donut")}
            className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
              view === "donut" ? "bg-teal-400/15 text-teal-300" : "text-white/35 hover:text-white/60"
            }`}
          >
            Donut
          </button>
        </div>
      </div>

      <div className="bg-white/4 border border-white/10 rounded-xl p-3 flex-1">
        {view === "bars" ? (
          <div className="space-y-2.5">
            {allRows.map((row, i) => (
              <div key={row.symbol}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-white/70 font-medium">{row.symbol}</span>
                  <span className="text-white/40 tabular-nums">{row.percent.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${row.percent}%`, backgroundColor: barColors[i % barColors.length] }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DonutChart rows={allRows} />
        )}
      </div>
    </div>
  );
}
