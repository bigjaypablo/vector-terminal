import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { Skeleton } from "../components/ui/Skeleton";
import { ErrorState } from "../components/ui/ErrorState";
import { useWalletLookup } from "../hooks/useWalletLookup";

const SAMPLE_ADDRESS = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";

function fmtPrice(p) {
  if (p < 0.01) return `$${p.toFixed(6)}`;
  return `$${p.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
}

export default function WalletIntelligence() {
  const { data, loading, error, lookup } = useWalletLookup();
  const [searchParams] = useSearchParams();
  const prefilled = searchParams.get("address") || "";
  const [input, setInput] = useState(prefilled);

  useEffect(() => {
    if (prefilled) lookup(prefilled);
  }, [prefilled, lookup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) lookup(input);
  };

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl mx-auto">
        <div className="text-xl text-white font-semibold">Wallet Intelligence</div>
        <div className="text-sm text-white/40 mt-0.5 mb-6">
          Look up real SOL and token holdings for any Solana wallet
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a Solana wallet address..."
            className="flex-1 px-4 py-2.5 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400/40"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 text-sm font-medium rounded-lg bg-teal-400/15 text-teal-300 border border-teal-400/30 hover:bg-teal-400/20 transition-colors disabled:opacity-50"
          >
            {loading ? "Looking up..." : "Look up"}
          </button>
        </form>

        <button
          onClick={() => {
            setInput(SAMPLE_ADDRESS);
            lookup(SAMPLE_ADDRESS);
          }}
          className="text-[12px] text-teal-400/70 hover:text-teal-300 mb-6"
        >
          Try a sample wallet
        </button>

        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        )}

        {error && (
          <div className="bg-white/4 border border-white/10 rounded-xl">
            <ErrorState message={error} onRetry={() => lookup(input)} />
          </div>
        )}

        {data && !loading && (
          <>
            <div className="bg-white/4 border border-white/10 rounded-xl p-4 md:p-6 mb-5">
              <div className="text-[11px] text-white/40 tracking-wide mb-1">TOTAL VALUE (KNOWN TOKENS)</div>
              <div className="text-2xl text-white font-semibold tabular-nums">
                ${data.totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-white/30 mt-1 break-all">{data.address}</div>
            </div>

            <div className="text-sm text-white/50 tracking-wide mb-2">Holdings</div>
            <div className="bg-white/4 border border-white/10 rounded-xl divide-y divide-white/8">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-teal-400/15 flex items-center justify-center text-[10px] text-teal-300 font-medium">
                    S
                  </div>
                  <span className="text-sm text-white font-medium">SOL</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white tabular-nums">{data.solBalance.toFixed(4)} SOL</div>
                  <div className="text-[11px] text-white/40 tabular-nums">
                    ${data.solValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {data.tokens.map((t) => (
                <div key={t.mint} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center text-[10px] text-white/60 font-medium">
                      {t.symbol[0]}
                    </div>
                    <span className="text-sm text-white font-medium">{t.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white tabular-nums">
                      {t.amount.toLocaleString()} @ {fmtPrice(t.price)}
                    </div>
                    <div className="text-[11px] text-white/40 tabular-nums">
                      ${t.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              ))}

              {data.unknownCount > 0 && (
                <div className="px-4 py-3 text-[12px] text-white/35">
                  +{data.unknownCount} other token{data.unknownCount > 1 ? "s" : ""} held (not in our tracked
                  token list, price unavailable)
                </div>
              )}

              {data.tokens.length === 0 && data.unknownCount === 0 && (
                <p className="text-sm text-white/35 text-center py-8">No SPL tokens held besides SOL</p>
              )}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
