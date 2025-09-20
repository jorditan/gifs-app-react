import type { Gif } from "../interfaces/gif.interface";
import type { GiphyResponse } from "../interfaces/gifphy.response";
import { giphyApi } from "../api/giphy.api";

export const getGifsByQuery = async (
  query: string,
  offset: number = 0,
  limit: number = 10,
): Promise<Gif[]> => {
  if (query.trim().length === 0) {
    return [];
  }

  try {
    const response = await giphyApi.get<GiphyResponse>(
      "https://api.giphy.com/v1/gifs/search",
      {
        params: {
          q: query,
          limit: limit,
          offset: offset,
        },
      },
    );

    return response.data.data.map((gif) => ({
      id: gif.id,
      title: gif.title,
      url: gif.images.original.url,
      width: Number(gif.images.original.width),
      height: Number(gif.images.original.height),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
