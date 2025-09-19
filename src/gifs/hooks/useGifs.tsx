import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-query.action";
import type { Gif } from "../interfaces/gif.interface";

export const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [currentGifs, setCurrentGifs] = useState<Gif[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setCurrentGifs(gifsCache.current[term])
      return
    }

    const gifs = await getGifsByQuery(term);
    setCurrentGifs(gifs)
    gifsCache.current[term] = gifs
  }

  const handleSearch = async (query: string) => {
    if (query.trim().length == 0) return
    query = query.toLowerCase().trim();

    if (!previousTerms.includes(query)) {
      setPreviousTerms([query, ...previousTerms].splice(0, 8));
    }

    const gifs = await getGifsByQuery(query);
    setCurrentGifs(gifs);
    gifsCache.current[query] = gifs
  }

  return {
    previousTerms,
    currentGifs,

    handleSearch,
    handleTermClicked,
  }

}
