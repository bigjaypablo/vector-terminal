import { useState, useEffect, useCallback } from "react";
import { getTokenBySymbol } from "../services/tokensApi";

export function useToken(symbol) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getTokenBySymbol(symbol);
      setData(result);
    } catch (err) {
      setError(err.message || "Token not found");
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
