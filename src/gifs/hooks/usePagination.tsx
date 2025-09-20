import { useEffect, useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page])


  return {
    page,

    setPage
  }
}
