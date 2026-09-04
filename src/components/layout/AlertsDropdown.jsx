import { useState, useRef, useEffect } from "react";
import { IconBell } from "../ui/Icons";
import { useAlerts } from "../../hooks/useAlerts";

export default function AlertsDropdown() {
  const { alerts, loading } = useAlerts();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={`Alerts${alerts.length ? `, ${alerts.length} new` : ""}`}
        className="relative w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-white/50"
      >
        <IconBell width={15} height={15} />
        {alerts.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-teal-400 text-[9px] text-[#04342C] font-semibold flex items-center justify-center">
            {alerts.length > 9 ? "9+" : alerts.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-[#0e0e0e] border border-white/10 rounded-xl shadow-lg z-30 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/8 text-[12px] text-white/50">
            Alerts based on real market movement
          </div>
          <div className="max-h-72 overflow-y-auto">
            {loading ? (
              <p className="text-[12px] text-white/35 text-center py-6">Loading...</p>
            ) : alerts.length === 0 ? (
              <p className="text-[12px] text-white/35 text-center py-6">
                No significant moves right now
              </p>
            ) : (
              alerts.map((a) => (
                <div key={a.id} className="flex items-start gap-2 px-4 py-2.5 border-b border-white/6 last:border-0">
                  <span className={a.positive ? "text-teal-400" : "text-red-400"}>●</span>
                  <span className="text-[12px] text-white/75">{a.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
