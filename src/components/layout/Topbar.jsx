import { useState, useEffect } from "react";
import { IconMenu, IconSearch } from "../ui/Icons";
import { useWallet } from "../../context/WalletContext";
import FullMobileMenu from "./FullMobileMenu";
import AlertsDropdown from "./AlertsDropdown";
import GlobalSearch from "./GlobalSearch";
import MobileSearchOverlay from "./MobileSearchOverlay";

export default function Topbar() {
  const { connected, connecting, connect, disconnect, shortAddress } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        if (window.innerWidth < 768) {
          e.preventDefault();
          setMobileSearchOpen(true);
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden text-white/60 hover:text-white transition-colors"
          >
            <IconMenu width={20} height={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-[4px] bg-teal-400" />
            <span className="text-sm text-white font-medium hidden md:inline">VECTOR</span>
          </div>
        </div>

        <GlobalSearch />

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileSearchOpen(true)}
            aria-label="Search"
            className="md:hidden w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-white/50"
          >
            <IconSearch width={15} height={15} />
          </button>
          <AlertsDropdown />
          {connected ? (
            <button
              onClick={disconnect}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 text-white/70 border border-white/15 hover:bg-white/10 transition-colors"
            >
              {shortAddress}
            </button>
          ) : (
            <button
              onClick={connect}
              disabled={connecting}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-teal-400/10 text-teal-300 border border-teal-400/25 hover:bg-teal-400/15 transition-colors disabled:opacity-50"
            >
              {connecting ? "Connecting..." : "Connect wallet"}
            </button>
          )}
        </div>
      </header>

      <FullMobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <MobileSearchOverlay open={mobileSearchOpen} onClose={() => setMobileSearchOpen(false)} />
    </>
  );
}
