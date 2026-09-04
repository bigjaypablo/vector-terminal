import { useWallet } from "../../context/WalletContext";

function universalLink(walletName, currentUrl) {
  const encoded = encodeURIComponent(currentUrl);
  if (walletName === "Phantom") {
    return `https://phantom.app/ul/browse/${encoded}?ref=${encoded}`;
  }
  if (walletName === "Solflare") {
    return `https://solflare.com/ul/v1/browse/${encoded}?ref=${encoded}`;
  }
  return null;
}

export default function WalletModal() {
  const { modalOpen, closeModal, wallets, chooseWallet, connectError } = useWallet();

  if (!modalOpen) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const installed = wallets.filter((w) => w.readyState === "Installed");
  const notInstalled = wallets.filter(
    (w) => w.readyState !== "Installed" && w.adapter.name !== "Mobile Wallet Adapter"
  );
  const mobileAdapter = wallets.find((w) => w.adapter.name === "Mobile Wallet Adapter");

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

        {installed.length > 0 && (
          <div className="flex flex-col gap-1 mb-2">
            {installed.map((w) => (
              <button
                key={w.adapter.name}
                onClick={() => chooseWallet(w.adapter.name)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
              >
                <img src={w.adapter.icon} alt="" className="w-6 h-6 rounded" />
                <span className="text-sm text-white/85">{w.adapter.name}</span>
                <span className="ml-auto text-[10px] text-teal-400">Detected</span>
              </button>
            ))}
          </div>
        )}

        {mobileAdapter && (
          <button
            onClick={() => chooseWallet(mobileAdapter.adapter.name)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left mb-2 border border-white/8"
          >
            <img src={mobileAdapter.adapter.icon} alt="" className="w-6 h-6 rounded" />
            <span className="text-sm text-white/85">Connect an app on this device</span>
          </button>
        )}

        {notInstalled.length > 0 && (
          <div className="flex flex-col gap-1">
            {notInstalled.map((w) => {
              const link = universalLink(w.adapter.name, currentUrl) || w.adapter.url;
              return (
                <a
                  key={w.adapter.name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <img src={w.adapter.icon} alt="" className="w-6 h-6 rounded opacity-60" />
                  <span className="text-sm text-white/50">{w.adapter.name}</span>
                  <span className="ml-auto text-[10px] text-white/30">Open in app</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
