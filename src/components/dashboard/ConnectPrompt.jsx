import { useWallet } from "../../context/WalletContext";

export default function ConnectPrompt() {
  const { connect, connecting } = useWallet();

  return (
    <div className="bg-white/4 border border-dashed border-white/15 rounded-xl p-8 text-center">
      <div className="text-sm text-white/75 mb-1">Connect a wallet to see the rest of your dashboard</div>
      <div className="text-[12px] text-white/35 mb-4">
        Portfolio value, holdings, allocation, and activity
      </div>
      <button
        onClick={connect}
        disabled={connecting}
        className="px-5 py-2 text-sm font-medium rounded-full bg-teal-400/15 text-teal-300 border border-teal-400/30 hover:bg-teal-400/20 transition-colors disabled:opacity-50"
      >
        {connecting ? "Connecting..." : "Connect wallet"}
      </button>
    </div>
  );
}
