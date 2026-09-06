import { createContext, useContext, useMemo, useState, useEffect } from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
  useWallet as useSolanaWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider, useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";

const RPC_URL = "https://api.mainnet-beta.solana.com";
const MAINNET_GENESIS_HASH = "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d";

const VectorWalletContext = createContext(null);

function InnerProvider({ children }) {
  const { connection } = useConnection();
  const { publicKey, connected, connecting, disconnect, wallet } = useSolanaWallet();
  const { setVisible } = useWalletModal();
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

  const address = publicKey ? publicKey.toBase58() : null;

  const value = {
    connected,
    connecting,
    address,
    shortAddress: address ? `${address.slice(0, 4)}...${address.slice(-4)}` : null,
    connect: () => setVisible(true),
    disconnect,
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
        <WalletModalProvider>
          <InnerProvider>{children}</InnerProvider>
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}

export function useWallet() {
  return useContext(VectorWalletContext);
}
