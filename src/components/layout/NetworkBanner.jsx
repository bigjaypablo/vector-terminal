import { useWallet } from "../../context/WalletContext";

export default function NetworkBanner() {
  const { networkStatus } = useWallet();

  if (networkStatus !== "error" && networkStatus !== "mismatch") return null;

  return (
    <div className="bg-red-500/10 border-b border-red-500/20 text-red-300 text-[12px] text-center py-1.5 px-4">
      {networkStatus === "mismatch"
        ? "Connected RPC does not appear to be Solana mainnet — data may be inaccurate."
        : "Unable to reach the Solana network right now — some data may fail to load."}
    </div>
  );
}
