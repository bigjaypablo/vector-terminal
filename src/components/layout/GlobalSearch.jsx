import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalSearch } from "../../hooks/useGlobalSearch";
import SearchResultsList from "./SearchResultsList";

export default function GlobalSearch() {
  const { query, setQuery, results, loading, isWalletAddress } = useGlobalSearch();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setFocused(false);
    }
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEnter = (e) => {
    if (e.key !== "Enter") return;
    if (isWalletAddress) {
      navigate(`/app/wallet-intelligence?address=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setFocused(false);
    } else if (results.length > 0) {
      navigate(`/token/${results[0].symbol}`);
      setQuery("");
      setFocused(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative hidden md:flex items-center flex-1 max-w-sm">
      <div className="flex items-center w-full gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 focus-within:border-teal-400/30">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleEnter}
          placeholder="Search tokens or paste a wallet address..."
          className="flex-1 bg-transparent text-xs text-white placeholder:text-white/30 focus:outline-none"
        />
        {query ? (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="text-white/30 hover:text-white/60 text-sm leading-none"
          >
            ×
          </button>
        ) : (
          <kbd className="text-[10px] text-white/25 border border-white/15 rounded px-1">⌘K</kbd>
        )}
      </div>

      {focused && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#0e0e0e] border border-white/10 rounded-lg overflow-hidden z-30 max-h-80 overflow-y-auto">
          <SearchResultsList
            query={query}
            results={results}
            loading={loading}
            isWalletAddress={isWalletAddress}
            onNavigate={() => {
              setQuery("");
              setFocused(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
