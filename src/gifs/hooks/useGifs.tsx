import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGifsByQuery } from "../actions/get-gifs-query.action";
import type { Gif } from "../interfaces/gif.interface";
import { toast } from "sonner";
import { usePagination } from "./usePagination";

export const useGifs = () => {
  const queryClient = useQueryClient();
  const { page, setPage } = usePagination();

  const [query, setQuery] = useState("");
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const {
    data: gifs = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["gifs", { q: query, page }],
    queryFn: () => getGifsByQuery(query, page,),
    enabled: query.trim().length > 0,
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });

  const handleSearch = (raw: string) => {
    const q = raw.toLowerCase().trim();
    if (!q) return;

    setQuery(q);
    setPage(0);

    if (!previousTerms.includes(q)) {
      setPreviousTerms((prev) => [q, ...prev].slice(0, 8));
    }

    queryClient.prefetchQuery({
      queryKey: ["gifs", { q, page: 1 }],
      queryFn: () => getGifsByQuery(q, 1,),
    });

    console.log(gifs);
  };

  const handleTermClicked = (term: string) => {
    handleSearch(term);
  };

  const handleNextPage = () => {
    const next = page + 1;
    setPage(next);

    if (query) {
      queryClient.prefetchQuery({
        queryKey: ["gifs", { q: query, page: next + 1 }],
        queryFn: () => getGifsByQuery(query, next + 1,),
      });
    }
  };

  const handlePrevPage = () => {
    const prev = Math.max(0, page - 1);
    setPage(prev);

    if (query && prev > 0) {
      queryClient.prefetchQuery({
        queryKey: ["gifs", { q: query, page: prev - 1 }],
        queryFn: () => getGifsByQuery(query, prev - 1,),
      });
    }
  };

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

    handleSearch,
    handleTermClicked,
    handleNextPage,
    handlePrevPage,
    handleDownload,
  };
};
