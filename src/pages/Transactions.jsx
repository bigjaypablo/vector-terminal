import { useState } from "react";
import AppShell from "../components/layout/AppShell";
import { Skeleton } from "../components/ui/Skeleton";
import { ErrorState } from "../components/ui/ErrorState";
import { useTransactions } from "../hooks/useTransactions";

const filters = [
  { key: "all", label: "All" },
  { key: "received", label: "Received" },
  { key: "sent", label: "Sent" },
  { key: "swapped", label: "Swapped" },
];

const statusStyle = {
  confirmed: "text-teal-400 bg-teal-400/10",
  pending: "text-amber-400 bg-amber-400/10",
  failed: "text-red-400 bg-red-400/10",
};

export default function Transactions() {
  const { transactions, loading, error, refetch, query, setQuery, typeFilter, setTypeFilter } =
    useTransactions();
  const [expanded, setExpanded] = useState(null);

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl mx-auto">
        <div className="text-xl text-white font-semibold">Transactions</div>
        <div className="text-sm text-white/40 mt-0.5 mb-1">Full wallet transaction history</div>
        <p className="text-[10px] text-white/25 mb-5">Demo data — illustrative, not live transactions</p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by asset or type..."
          className="w-full px-4 py-2.5 mb-3 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400/40"
        />

        <div className="flex gap-2 mb-4 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setTypeFilter(f.key)}
              className={`text-[12px] px-3 py-1.5 rounded-full transition-colors ${
                typeFilter === f.key
                  ? "bg-teal-400/15 text-teal-300 border border-teal-400/30"
                  : "text-white/45 border border-white/10 hover:bg-white/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="bg-white/4 border border-white/10 rounded-xl divide-y divide-white/8">
          {error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-4 py-3">
                <Skeleton className="h-3 w-32 mb-1" />
                <Skeleton className="h-2.5 w-20" />
              </div>
            ))
          ) : transactions.length === 0 ? (
            <p className="text-sm text-white/35 text-center py-10">No transactions found</p>
          ) : (
            transactions.map((tx) => (
              <div key={tx.id}>
                <button
                  onClick={() => setExpanded(expanded === tx.id ? null : tx.id)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left"
                >
                  <div>
                    <div className="text-sm text-white/90 font-medium">{tx.type}</div>
                    <div className="text-[12px] text-white/40 mt-0.5">
                      {tx.amount} · {tx.timestamp}
                    </div>
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${statusStyle[tx.status]}`}>
                    {tx.status}
                  </span>
                </button>

                {expanded === tx.id && (
                  <div className="px-4 pb-3 text-[12px] text-white/50 space-y-1 bg-white/3">
                    <div className="flex justify-between">
                      <span>Asset</span>
                      <span className="text-white/80">{tx.asset}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>USD value</span>
                      <span className="text-white/80">{tx.usdValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status</span>
                      <span className="text-white/80 capitalize">{tx.status}</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
