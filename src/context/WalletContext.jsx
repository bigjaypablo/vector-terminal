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
  const [debugLog, setDebugLog] = useState([]);
  const pendingConnect = useRef(false);

  const log = useCallback((msg) => {
    setDebugLog((prev) => [...prev.slice(-6), `${new Date().toLocaleTimeString()} ${msg}`]);
  }, []);

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

  useEffect(() => {
    if (!pendingConnect.current) return;
    log(`effect fired: wallet=${wallet?.adapter.name || "null"} readyState=${wallet?.readyState || "n/a"} connected=${connected} connecting=${connecting}`);
    if (!wallet || connected || connecting) return;
    pendingConnect.current = false;
    log("calling adapterConnect()...");
    adapterConnect()
      .then(() => log("adapterConnect() resolved"))
      .catch((err) => {
        log(`adapterConnect() threw: ${err?.name || "Error"}: ${err?.message || err}`);
        setConnectError(err?.message || "Unable to connect wallet");
      });
  }, [wallet, connected, connecting, adapterConnect, log]);

  const chooseWallet = useCallback(
    (walletName) => {
      setConnectError(null);
      const target = wallets.find((w) => w.adapter.name === walletName);
      log(`chooseWallet(${walletName}) — current readyState: ${target?.readyState}`);
      pendingConnect.current = true;
      select(walletName);
      log("select() called");
      setModalOpen(false);
    },
    [select, wallets, log]
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
    debugLog,
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
