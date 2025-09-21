import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGifsByQuery } from "../actions/get-gifs-query.action";
import type { Gif } from "../interfaces/gif.interface";
import { toast } from "sonner";
import { usePagination } from "./usePagination";

export const useGifs = () => {
  const queryClient = useQueryClient();
  const { page, setPage } = usePagination();

  const [pageSize, setPageSize] = useState(10);
  const offsetSize = page * pageSize

  const [query, setQuery] = useState("");
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const {
    data: gifs = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["gifs", { q: query, offset: offsetSize, limit: pageSize }],
    queryFn: () => getGifsByQuery(query, offsetSize, pageSize),
    enabled: query.trim().length > 0,
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });


  const handleSearch = (raw: string) => {
    const q = raw.toLowerCase().trim();
    if (!q) return;

    setQuery(q);

    if (!previousTerms.includes(q)) {
      setPreviousTerms((prev) => [q, ...prev].slice(0, 8));
    }

    queryClient.prefetchQuery({
      queryKey: ["gifs", { q, offset: offsetSize, limit: pageSize }],
      queryFn: () => getGifsByQuery(q, offsetSize, pageSize),
    });
  };

  const handleTermClicked = (term: string) => {
    handleSearch(term);
  };

  const handleNextPage = () => {
    const next = page + 1;
    setPage(next);

    if (query) {
      const nextPageOffset = next * offsetSize
      queryClient.prefetchQuery({
        queryKey: ["gifs", { q: query, offset: nextPageOffset, limit: pageSize }],
        queryFn: () => getGifsByQuery(query, nextPageOffset, pageSize),
      });
    }
  };

  const handlePrevPage = () => {
    const prev = Math.max(0, page - 1);

    if (query && prev > 0) {
      setPage(prev);
      const prevOffset = prev * offsetSize
      queryClient.prefetchQuery({
        queryKey: ["gifs", { q: query, offset: prevOffset, limit: pageSize }],
        queryFn: () => getGifsByQuery(query, prevOffset, pageSize),
      });
    }
  };

  const handlePageSize = (newSize: number) => {
    setPageSize(newSize);
  }

  const handleDownload = async (gif: Gif) => {
    try {
      const res = await fetch(gif.url);
      const blob = await res.blob();
      const ct = res.headers.get("Content-Type");
      const ext = ct?.split("/")[1] || "gif";

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${gif.title}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast("El GIF se está descargando");
    } catch (e) {
      toast("Se ha producido un error, intente más tarde");
      console.error(e);
    }
  };

  return {
    gifs,
    previousTerms,
    isLoading,
    isFetching,
    page,
    pageSize,

    handleSearch,
    handlePageSize,
    handleTermClicked,
    handleNextPage,
    handlePrevPage,
    handleDownload,
  };
};
