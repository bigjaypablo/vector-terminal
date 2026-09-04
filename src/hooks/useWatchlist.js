import { useState, useEffect, useCallback } from "react";
import { getWatchlist } from "../services/walletApi";

export function useWatchlist() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getWatchlist();
      setTokens(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggle = useCallback((symbol) => {
    setTokens((prev) =>
      prev.map((t) => (t.symbol === symbol ? { ...t, watched: !t.watched } : t))
    );
  }, []);

  return { tokens, loading, error, refetch: fetchData, toggle };
}
