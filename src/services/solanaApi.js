const RPC_URL = "https://api.mainnet-beta.solana.com";
const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

async function rpcCall(method, params) {
  const res = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`Solana RPC returned ${res.status}`);
  const json = await res.json();
  if (json.error) throw new Error(json.error.message || "Invalid wallet address or RPC error");
  return json.result;
}

export async function getWalletOverview(address) {
  const [balanceResult, tokenResult] = await Promise.all([
    rpcCall("getBalance", [address]),
    rpcCall("getTokenAccountsByOwner", [
      address,
      { programId: TOKEN_PROGRAM_ID },
      { encoding: "jsonParsed" },
    ]),
  ]);

  const solBalance = balanceResult.value / 1e9;

  const tokens = tokenResult.value
    .map((acc) => {
      const info = acc.account.data.parsed.info;
      return {
        mint: info.mint,
        amount: info.tokenAmount.uiAmount,
        decimals: info.tokenAmount.decimals,
      };
    })
    .filter((t) => t.amount > 0);

  return { solBalance, tokens };
}
