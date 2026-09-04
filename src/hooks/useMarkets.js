import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getTopTokens, searchTokens } from "../services/tokensApi";

const PAGE_SIZE = 50;

export function useMarkets() {
  const [topTokens, setTopTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef(null);

  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState("price");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);

  const fetchTopTokens = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getTopTokens({ category: "toptraded", interval: "24h", limit: 100 });
      setTopTokens(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopTokens();
  }, [fetchTopTokens]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const result = await searchTokens(query);
        setSearchResults(result);
      } catch {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const activeList = searchResults !== null ? searchResults : topTokens;

  const filtered = useMemo(() => {
    if (filter === "gainers") return activeList.filter((t) => t.change24h > 0);
    if (filter === "losers") return activeList.filter((t) => t.change24h < 0);
    return activeList;
  }, [activeList, filter]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    list.sort((a, b) => {
      const av = a[sortKey] ?? 0;
      const bv = b[sortKey] ?? 0;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return list;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = useCallback(
    (key) => {
      if (sortKey === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDir("desc");
      }
      setPage(1);
    },
    [sortKey]
  );

  return {
    tokens: paged,
    totalResults: sorted.length,
    page,
    totalPages,
    setPage,
    loading: query.trim() ? searching : loading,
    error,
    onRetry: fetchTopTokens,
    query,
    setQuery: (q) => {
      setQuery(q);
      setPage(1);
    },
    filter,
    setFilter: (f) => {
      setFilter(f);
      setPage(1);
    },
    sortKey,
    sortDir,
    toggleSort,
    isSearchMode: searchResults !== null,
  };
}
