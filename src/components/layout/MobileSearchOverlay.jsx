import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalSearch } from "../../hooks/useGlobalSearch";
import SearchResultsList from "./SearchResultsList";

export default function MobileSearchOverlay({ open, onClose }) {
  const { query, setQuery, results, loading, isWalletAddress } = useGlobalSearch();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  const handleEnter = (e) => {
    if (e.key !== "Enter") return;
    if (isWalletAddress) {
      navigate(`/app/wallet-intelligence?address=${encodeURIComponent(query.trim())}`);
      handleClose();
    } else if (results.length > 0) {
      navigate(`/token/${results[0].symbol}`);
      handleClose();
    }
  };

  return (
    <div className="md:hidden fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 shrink-0">
        <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus-within:border-teal-400/30">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Search tokens or paste a wallet address..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="text-white/30 hover:text-white/60 text-base leading-none"
            >
              ×
            </button>
          )}
        </div>
        <button onClick={handleClose} className="text-white/50 text-sm px-2 shrink-0">
          Cancel
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SearchResultsList
          query={query}
          results={results}
          loading={loading}
          isWalletAddress={isWalletAddress}
          onNavigate={handleClose}
        />
      </div>
    </div>
  );
}
