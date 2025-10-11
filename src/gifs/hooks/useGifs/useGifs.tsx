import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGifsByQuery } from "../../actions/get-gifs-query.action";
import type { Gif } from "../../interfaces/gif.interface";
import { toast } from "sonner";
import { usePagination } from "../usePagination";
import { useGifsStore } from "../../../store/useGifsStore";

export const useGifs = () => {
  const queryClient = useQueryClient();

  const { page, setPage, resetPagination } = usePagination();
  const { prevTerms, addPrevTerm, query, setQuery } = useGifsStore();

  const [pageSize, setPageSize] = useState(10);

  const offset = page * pageSize

  const {
    data: gifs = [],
    isFetching,
  } = useQuery({
    queryKey: ["gifs", { q: query, offset: offset, limit: pageSize }],
    queryFn: () => {
      console.log('🔥 Fetching:', { query, offset, pageSize });
      return getGifsByQuery(query, offset, pageSize);
    },
    enabled: query.trim() !== '',
    staleTime: 15 * 1000,

  });

  useEffect(() => {
    if (query == "") { return };
    const nextPageOffset = (page + 1) * pageSize;
    queryClient.prefetchQuery({
      queryKey: ["gifs", { q: query, offset: nextPageOffset, limit: pageSize }],
      queryFn: () => getGifsByQuery(query, nextPageOffset, pageSize),
    })

    if (page > 0) {
      const prevPageOffset = (page - 1) * pageSize;
      queryClient.prefetchQuery({
        queryKey: ["gifs", { q: query, offset: prevPageOffset, limit: pageSize }],
        queryFn: () => getGifsByQuery(query, page - 1, pageSize),
      });
    }

  }, [page, pageSize, queryClient, query])


  const handleQuerySearch = (raw: string) => {
    const q = raw.toLowerCase().trim();
    if (!q) return;

    if (prevTerms.length === 0 || q !== prevTerms[0]) {
      resetPagination();
    }

    setQuery(q);
    addPrevTerm(q);
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
    isFetching,
    page,
    pageSize,
    handleQuerySearch,
    handlePageSize,
    handleNextPage,
    handlePrevPage,
    handleDownload,
  };
};
