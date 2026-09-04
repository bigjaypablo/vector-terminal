import { useWallet } from "../../context/WalletContext";

const wallets = ["Phantom", "Solflare", "Backpack"];

export function EmptyState() {
  const { connect, connecting } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <h2 className="text-lg text-white font-medium mb-1.5">Connect your wallet</h2>
      <p className="text-sm text-white/40 max-w-xs mb-5">
        Connect a Solana wallet to unlock portfolio tracking, asset analytics, transactions, and wallet intelligence.
      </p>
      <button
        onClick={connect}
        disabled={connecting}
        className="px-5 py-2.5 text-sm font-medium rounded-full bg-teal-400/15 text-teal-300 border border-teal-400/30 hover:bg-teal-400/20 transition-colors disabled:opacity-50"
      >
        {connecting ? "Connecting..." : "Connect wallet"}
      </button>
      <div className="flex gap-3 mt-4">
        {wallets.map((w) => (
          <span key={w} className="text-[12px] text-white/30">{w}</span>
        ))}
      </div>
    </div>
  );
}
