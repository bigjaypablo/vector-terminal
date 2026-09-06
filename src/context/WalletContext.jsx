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

const VectorWalletContext = createContext(null);

function InnerProvider({ children }) {
  const { connection } = useConnection();
  const { publicKey, connected, connecting, disconnect, wallet, wallets, select } = useSolanaWallet();
  const [modalOpen, setModalOpen] = useState(false);
  const [networkStatus, setNetworkStatus] = useState("checking");

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
      select(walletName);
      setModalOpen(false);
      // autoConnect on SolanaWalletProvider handles the actual connect() call
      // once a wallet is selected — this is what triggers each adapter's own
      // correct mobile-vs-desktop behavior, not anything we build ourselves.
    },
    [select]
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
