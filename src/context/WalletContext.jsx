import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
  useWallet as useSolanaWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";

const RPC_URL = "https://api.mainnet-beta.solana.com";
const MAINNET_GENESIS_HASH = "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d";
const ALLOWED_WALLETS = ["Phantom", "Solflare"];

const DEEP_LINKS = {
  Phantom: (url) => `https://phantom.app/ul/browse/${encodeURIComponent(url)}?ref=${encodeURIComponent(url)}`,
  Solflare: (url) => `https://solflare.com/ul/v1/browse/${encodeURIComponent(url)}?ref=${encodeURIComponent(url)}`,
};

const VectorWalletContext = createContext(null);

function InnerProvider({ children }) {
  const { connection } = useConnection();
  const { publicKey, connected, connecting, disconnect, wallet, wallets, select, connect: adapterConnect } =
    useSolanaWallet();
  const [modalOpen, setModalOpen] = useState(false);
  const [networkStatus, setNetworkStatus] = useState("checking");
  const [connectError, setConnectError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    connection
      .getGenesisHash()
      .then((hash) => {
        if (cancelled) return;
        setNetworkStatus(hash === MAINNET_GENESIS_HASH ? "ok" : "mismatch");
      })
      .catch(() => {
        if (!cancelled) setNetworkStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [connection]);

  const chooseWallet = useCallback(
    (walletName) => {
      setConnectError(null);
      const target = wallets.find((w) => w.adapter.name === walletName);

      if (target?.readyState === "Installed") {
        select(walletName);
        setModalOpen(false);
        adapterConnect().catch((err) => setConnectError(err?.message || "Unable to connect wallet"));
        return;
      }

      // Not detected as a browser extension — redirect using the wallet's
      // own documented mobile deep link, since its adapter's connect()
      // can't do this reliably on every mobile browser.
      const buildLink = DEEP_LINKS[walletName];
      if (buildLink) {
        window.location.href = buildLink(window.location.href);
      } else {
        setConnectError(`${walletName} is not installed and no deep link is available.`);
      }
    },
    [select, adapterConnect, wallets]
  );

  const address = publicKey ? publicKey.toBase58() : null;
  const visibleWallets = wallets.filter((w) => ALLOWED_WALLETS.includes(w.adapter.name));

  const value = {
    connected,
    connecting,
    address,
    shortAddress: address ? `${address.slice(0, 4)}...${address.slice(-4)}` : null,
    connect: () => setModalOpen(true),
    disconnect,
    modalOpen,
    closeModal: () => setModalOpen(false),
    wallets: visibleWallets,
    chooseWallet,
    connectError,
    activeWalletName: wallet?.adapter.name || null,
    networkStatus,
  };

  return <VectorWalletContext.Provider value={value}>{children}</VectorWalletContext.Provider>;
}

export function WalletProvider({ children }) {
  const walletAdapters = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={RPC_URL}>
      <SolanaWalletProvider wallets={walletAdapters} autoConnect>
        <InnerProvider>{children}</InnerProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}

export function useWallet() {
  return useContext(VectorWalletContext);
}
