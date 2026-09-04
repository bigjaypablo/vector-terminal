import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSecondsAgo((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <div className="flex items-center gap-2 text-sm text-white/40 uppercase tracking-wider">
        Data updated {secondsAgo} sec ago
        <button
          onClick={() => setSecondsAgo(0)}
          className="ml-1 text-white/50 hover:text-white transition-colors"
          aria-label="Refresh"
        >
          {/* inline SVG, no icon lib */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-3-6.7" />
            <path d="M21 3v6h-6" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 text-sm rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 hover:bg-teal-500/20 transition-colors">
          Refer Friends
        </button>
        <button className="px-4 py-2 text-sm rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
          Connect
        </button>
      </div>
    </div>
  );
}
