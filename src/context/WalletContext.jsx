import { createContext, useContext, useMemo, useState, useEffect, useCallback, useRef } from "react";
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
  const {
    publicKey,
    connected,
    connecting,
    disconnect,
    wallet,
    wallets,
    select,
    connect: adapterConnect,
  } = useSolanaWallet();
  const [modalOpen, setModalOpen] = useState(false);
  const [networkStatus, setNetworkStatus] = useState("checking");
  const [connectError, setConnectError] = useState(null);
  const pendingConnect = useRef(false);

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

  // select() only chooses which adapter is "current" — it does not connect.
  // Once the newly selected wallet is reflected here, explicitly connect it.
  useEffect(() => {
    if (!pendingConnect.current || !wallet || connected || connecting) return;
    pendingConnect.current = false;
    adapterConnect().catch((err) => {
      setConnectError(err?.message || "Unable to connect wallet");
    });
  }, [wallet, connected, connecting, adapterConnect]);

  const chooseWallet = useCallback(
    (walletName) => {
      setConnectError(null);
      pendingConnect.current = true;
      select(walletName);
      setModalOpen(false);
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
