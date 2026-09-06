import { useWallet } from "../../context/WalletContext";

export default function WalletModal() {
  const { modalOpen, closeModal, wallets, chooseWallet, connectError } = useWallet();

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60" onClick={closeModal} />
      <div className="relative w-full md:w-80 bg-[#0e0e0e] border border-white/10 rounded-t-2xl md:rounded-2xl p-4 pb-8 md:pb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-white font-medium">Connect a wallet</span>
          <button onClick={closeModal} className="text-white/40 hover:text-white text-lg leading-none">
            ×
          </button>
        </div>

        {connectError && <p className="text-[12px] text-red-400 mb-3">{connectError}</p>}
        <div className="flex flex-col gap-1">
          {wallets.map((w) => (
            <button
              key={w.adapter.name}
              onClick={() => chooseWallet(w.adapter.name)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              <img src={w.adapter.icon} alt="" className="w-6 h-6 rounded" />
              <span className="text-sm text-white/85">{w.adapter.name}</span>
              {w.readyState === "Installed" && (
                <span className="ml-auto text-[10px] text-teal-400">Detected</span>
              )}
            </button>
          ))}
        </div>

        <p className="text-[10px] text-white/25 text-center mt-3">
          On mobile, this opens the wallet's own app automatically
        </p>
      </div>
    </div>
  );
}
