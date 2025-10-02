import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGifsByQuery } from "../../actions/get-gifs-query.action";
import type { Gif } from "../../interfaces/gif.interface";
import { toast } from "sonner";
import { usePagination } from "../usePagination";

export const useGifs = () => {
  const queryClient = useQueryClient();
  const { page, setPage, resetPagination } = usePagination();

  const [pageSize, setPageSize] = useState(10);
  const offset = page * pageSize

  const [query, setQuery] = useState("");
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const {
    data: gifs = [],
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ["gifs", { q: query, offset: offset, limit: pageSize }],
    queryFn: () => getGifsByQuery(query, offset, pageSize),
    enabled: query.trim().length > 0,

    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (!query) { return };
    const nextPageOffset = (page + 1) * pageSize;
    queryClient.prefetchQuery({
      queryKey: ["gifs", { q: query, offset: nextPageOffset, limit: pageSize }],
      queryFn: () => getGifsByQuery(query, nextPageOffset, pageSize),
    })

    if (page > 0) {
      queryClient.prefetchQuery({
        queryKey: ["gifs", { q: query, offset: nextPageOffset, limit: pageSize }],
        queryFn: () => getGifsByQuery(query, page - 1, pageSize),
      });
    }
  }, [page, pageSize, queryClient, query])


  const handleSearch = (raw: string) => {
    const q = raw.toLowerCase().trim();
    if (!q) return;

    if (previousTerms.length === 0 || q !== previousTerms[0]) {
      resetPagination();
    }

    setQuery(q);

    if (!previousTerms.includes(q)) {
      setPreviousTerms((prev) => [q, ...prev].slice(0, 8));
    }
  };


  const handleNextPage = () => {
    const next = page + 1; setPage(next);
  };

  const handlePrevPage = () => setPage(p => Math.max(0, p - 1));

  const handlePageSize = (size: number) => {
    setPageSize(size);
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
    isSuccess,
    isFetching,
    page,
    pageSize,

    handleSearch,
    handlePageSize,
    handleNextPage,
    handlePrevPage,
    handleDownload,
  };
};
