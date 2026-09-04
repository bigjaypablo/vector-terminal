import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { Skeleton } from "../components/ui/Skeleton";
import { ErrorState } from "../components/ui/ErrorState";
import { useMarkets } from "../hooks/useMarkets";

const filters = [
  { key: "all", label: "All" },
  { key: "gainers", label: "Gainers" },
  { key: "losers", label: "Losers" },
];

function fmtPrice(p) {
  if (p < 0.01) return `$${p.toFixed(6)}`;
  return `$${p.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
}

function SortHeader({ label, sortKeyName, sortKey, sortDir, onClick }) {
  const active = sortKey === sortKeyName;
  return (
    <button
      onClick={() => onClick(sortKeyName)}
      className={`flex items-center gap-1 ml-auto text-[11px] ${
        active ? "text-teal-300" : "text-white/35"
      }`}
    >
      {label} {active && (sortDir === "asc" ? "▲" : "▼")}
    </button>
  );
}

function TokenIcon({ icon, symbol }) {
  const [failed, setFailed] = useState(false);

  if (!icon || failed) {
    return (
      <div className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center text-[10px] text-white/60 shrink-0">
        {symbol?.[0] || "?"}
      </div>
    );
  }

  return (
    <img
      src={icon}
      alt=""
      className="w-7 h-7 rounded-full shrink-0 object-cover bg-white/8"
      onError={() => setFailed(true)}
    />
  );
}

export default function Markets() {
  const {
    tokens,
    totalResults,
    page,
    totalPages,
    setPage,
    loading,
    error,
    onRetry,
    query,
    setQuery,
    filter,
    setFilter,
    sortKey,
    sortDir,
    toggleSort,
    isSearchMode,
  } = useMarkets();

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <div className="text-xl text-white font-semibold">Markets</div>
        <div className="text-sm text-white/40 mt-0.5 mb-5">
          Solana token discovery and market data
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tokens by name, symbol, or mint address..."
          className="w-full px-4 py-2.5 mb-3 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400/40"
        />

        {!isSearchMode && (
          <div className="flex gap-2 mb-4">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-[12px] px-3 py-1.5 rounded-full transition-colors ${
                  filter === f.key
                    ? "bg-teal-400/15 text-teal-300 border border-teal-400/30"
                    : "text-white/45 border border-white/10 hover:bg-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div className="bg-white/4 border border-white/10 rounded-xl overflow-hidden">
          <div className="flex items-center px-4 py-2 border-b border-white/8 text-[11px] text-white/35">
            <span className="flex-[2]">TOKEN</span>
            <SortHeader label="PRICE" sortKeyName="price" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
            <span className="w-16 text-right ml-3">
              <SortHeader label="24H" sortKeyName="change24h" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
            </span>
          </div>

          {error ? (
            <ErrorState message={error} onRetry={onRetry} />
          ) : loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center px-4 py-3 border-b border-white/6 last:border-0">
                <Skeleton className="h-7 w-7 rounded-full" />
                <Skeleton className="h-3 w-20 ml-3" />
                <Skeleton className="h-3 w-14 ml-auto" />
              </div>
            ))
          ) : tokens.length === 0 ? (
            <p className="text-sm text-white/35 text-center py-10">No tokens found</p>
          ) : (
            tokens.map((t) => {
              const positive = t.change24h >= 0;
              return (
                <Link
                  key={t.id}
                  to={`/token/${t.symbol}`}
                  className="flex items-center px-4 py-3 border-b border-white/6 last:border-0 hover:bg-white/5 transition-colors"
                >
                  <div className="flex-[2] flex items-center gap-2.5 min-w-0 overflow-hidden pr-2">
                    <TokenIcon icon={t.icon} symbol={t.symbol} />
                    <div className="min-w-0 overflow-hidden">
                      <div className="text-sm text-white font-medium truncate">{t.symbol}</div>
                      <div className="text-[11px] text-white/35 truncate">{t.name}</div>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm text-white/70 tabular-nums">{fmtPrice(t.price)}</span>
                  <span
                    className={`shrink-0 w-16 text-right ml-3 text-[12px] tabular-nums ${
                      positive ? "text-teal-400" : "text-red-400"
                    }`}
                  >
                    {positive ? "▲" : "▼"} {Math.abs(t.change24h)}%
                  </span>
                </Link>
              );
            })
          )}
        </div>

        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-[12px] text-white/40">
            <span>
              Page {page} of {totalPages} · {totalResults} tokens
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-md border border-white/10 disabled:opacity-30"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-md border border-white/10 disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
