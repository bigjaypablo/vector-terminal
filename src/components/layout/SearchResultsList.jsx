import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/Skeleton";

export default function SearchResultsList({ query, results, loading, isWalletAddress, onNavigate }) {
  const navigate = useNavigate();

  if (!query.trim()) return null;

  const goToToken = (symbol) => {
    navigate(`/token/${symbol}`);
    onNavigate();
  };

  const goToWallet = () => {
    navigate(`/app/wallet-intelligence?address=${encodeURIComponent(query.trim())}`);
    onNavigate();
  };

  return (
    <div>
      {isWalletAddress && (
        <button
          onClick={goToWallet}
          className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-white/5 transition-colors text-left border-b border-white/8"
        >
          <span className="text-[11px] text-teal-400">View wallet</span>
          <span className="text-[12px] text-white/50 truncate">{query.trim()}</span>
        </button>
      )}

      {loading ? (
        <div className="p-2 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 px-1 py-1.5">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        !isWalletAddress && <p className="text-[12px] text-white/35 text-center py-4">No tokens found</p>
      ) : (
        results.map((t) => (
          <button
            key={t.id}
            onClick={() => goToToken(t.symbol)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/5 transition-colors text-left"
          >
            {t.icon ? (
              <img src={t.icon} alt="" className="w-6 h-6 rounded-full" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-white/8 flex items-center justify-center text-[9px] text-white/60">
                {t.symbol?.[0]}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-[12px] text-white font-medium">{t.symbol}</div>
              <div className="text-[10px] text-white/35 truncate">{t.name}</div>
            </div>
          </button>
        ))
      )}
    </div>
  );
}
