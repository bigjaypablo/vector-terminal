import { createContext, useContext, useMemo, useState, useCallback } from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
  useWallet as useSolanaWallet,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";

const RPC_URL = "https://api.mainnet-beta.solana.com";

const VectorWalletContext = createContext(null);

function InnerProvider({ children }) {
  const { publicKey, connected, connecting, wallets, select, connect, disconnect, wallet } =
    useSolanaWallet();
  const [modalOpen, setModalOpen] = useState(false);
  const [connectError, setConnectError] = useState(null);

  const openConnectModal = useCallback(() => {
    setConnectError(null);
    setModalOpen(true);
  }, []);

  const chooseWallet = useCallback(
    async (walletName) => {
      try {
        select(walletName);
        setModalOpen(false);
      } catch (err) {
        setConnectError(err.message || "Unable to select wallet");
      }
    },
    [select]
  );

  const address = publicKey ? publicKey.toBase58() : null;

  const value = {
    connected,
    connecting,
    address,
    shortAddress: address ? `${address.slice(0, 4)}...${address.slice(-4)}` : null,
    connect: openConnectModal,
    disconnect,
    modalOpen,
    closeModal: () => setModalOpen(false),
    wallets,
    chooseWallet,
    connectError,
    activeWalletName: wallet?.adapter.name || null,
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
