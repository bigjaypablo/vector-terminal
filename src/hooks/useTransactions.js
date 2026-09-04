import { useState, useEffect, useCallback, useMemo } from "react";
import { getTransactions } from "../services/transactionApi";

export function useTransactions() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getTransactions();
      setAll(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = useMemo(() => {
    return all.filter((tx) => {
      const matchesType = typeFilter === "all" || tx.type.toLowerCase() === typeFilter;
      const matchesQuery =
        !query.trim() ||
        tx.asset.toLowerCase().includes(query.toLowerCase()) ||
        tx.type.toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [all, typeFilter, query]);

  return { transactions: filtered, loading, error, refetch: fetchData, query, setQuery, typeFilter, setTypeFilter };
}
