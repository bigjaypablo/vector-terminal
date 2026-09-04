import { useState } from "react";
import AppShell from "../components/layout/AppShell";
import { Toggle } from "../components/ui/Toggle";
import { useWallet } from "../context/WalletContext";

function Row({ label, description, children }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div>
        <div className="text-sm text-white/85">{label}</div>
        {description && <div className="text-[11px] text-white/35 mt-0.5">{description}</div>}
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const { connected, connect, disconnect, connecting, shortAddress } = useWallet();
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [portfolioSummary, setPortfolioSummary] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleResetLayout = () => {
    localStorage.removeItem("vector-sidebar-collapsed");
    setResetMessage("Sidebar layout reset. Reload the page to see it take effect.");
  };

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <div className="text-xl text-white font-semibold">Settings</div>
        <div className="text-sm text-white/40 mt-0.5 mb-6">Manage your VECTOR preferences</div>

        <div className="text-sm text-white/50 tracking-wide mb-2">Wallet</div>
        <div className="bg-white/4 border border-white/10 rounded-xl divide-y divide-white/8 mb-6">
          <Row
            label={connected ? "Connected wallet" : "No wallet connected"}
            description={connected ? shortAddress : "Connect to unlock portfolio tracking"}
          >
            {connected ? (
              <button
                onClick={disconnect}
                className="text-[12px] px-3 py-1.5 rounded-full border border-white/15 text-white/70 hover:bg-white/5 transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={connect}
                disabled={connecting}
                className="text-[12px] px-3 py-1.5 rounded-full bg-teal-400/15 text-teal-300 border border-teal-400/30 hover:bg-teal-400/20 transition-colors disabled:opacity-50"
              >
                {connecting ? "Connecting..." : "Connect"}
              </button>
            )}
          </Row>
        </div>

        <div className="text-sm text-white/50 tracking-wide mb-2">Display</div>
        <div className="bg-white/4 border border-white/10 rounded-xl divide-y divide-white/8 mb-6">
          <Row label="Theme" description="VECTOR is dark-mode only, by design">
            <span className="text-[12px] text-white/35">Dark</span>
          </Row>
          <Row label="Currency" description="Additional currencies not yet supported">
            <span className="text-[12px] text-white/35">USD</span>
          </Row>
        </div>

        <div className="text-sm text-white/50 tracking-wide mb-2">Notifications</div>
        <p className="text-[10px] text-white/25 mb-2">
          Preferences only — no notification delivery system is wired up yet
        </p>
        <div className="bg-white/4 border border-white/10 rounded-xl divide-y divide-white/8 mb-6">
          <Row label="Price alerts" description="Notify on significant token price moves">
            <Toggle checked={priceAlerts} onChange={setPriceAlerts} label="Price alerts" />
          </Row>
          <Row label="Portfolio summary" description="Daily summary of portfolio performance">
            <Toggle checked={portfolioSummary} onChange={setPortfolioSummary} label="Portfolio summary" />
          </Row>
        </div>

        <div className="text-sm text-white/50 tracking-wide mb-2">Data</div>
        <div className="bg-white/4 border border-white/10 rounded-xl mb-2">
          <Row label="Reset layout preferences" description="Clears saved sidebar state">
            <button
              onClick={handleResetLayout}
              className="text-[12px] px-3 py-1.5 rounded-full border border-white/15 text-white/70 hover:bg-white/5 transition-colors"
            >
              Reset
            </button>
          </Row>
        </div>
        {resetMessage && <p className="text-[11px] text-teal-400/80 px-1">{resetMessage}</p>}
      </div>
    </AppShell>
  );
}
