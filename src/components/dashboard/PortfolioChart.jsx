import { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  BarController,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from "chart.js";

Chart.register(
  LineController,
  BarController,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip
);

export default function PortfolioChart({ data, type = "line" }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    chartRef.current?.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type,
      data: {
        labels: data.map(() => ""),
        datasets: [
          {
            data,
            borderColor: "#5DCAA5",
            backgroundColor: type === "bar" ? "rgba(93,202,165,0.5)" : "rgba(93,202,165,0.08)",
            borderWidth: type === "bar" ? 0 : 2,
            borderRadius: type === "bar" ? 3 : 0,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: "#5DCAA5",
            fill: type === "line",
            tension: 0.35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#111",
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 1,
            titleColor: "rgba(255,255,255,0.5)",
            bodyColor: "#fff",
            padding: 8,
            displayColors: false,
            callbacks: {
              label: (ctx) => `$${ctx.parsed.y.toLocaleString()}k`,
            },
          },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [data, type]);

  return (
    <div className="relative h-36 md:h-56 lg:h-64">
      <canvas ref={canvasRef} role="img" aria-label="Portfolio value over time" />
    </div>
  );
}
