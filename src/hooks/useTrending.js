import { useState, useEffect, useCallback } from "react";
import { getTopTokens } from "../services/tokensApi";

export function useTrending(limit = 6) {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getTopTokens({ category: "toptrending", interval: "24h", limit: 20 });
      const sorted = [...result].sort((a, b) => b.change24h - a.change24h).slice(0, limit);
      setTokens(sorted);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { tokens, loading, error, refetch: fetchData };
}
