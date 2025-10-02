import { useEffect, useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState<number>(0);

  const resetPagination = () => {
    setPage(0);
  }

  useEffect(() => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page])


  return {
    page,

    resetPagination,
    setPage
  }
}
