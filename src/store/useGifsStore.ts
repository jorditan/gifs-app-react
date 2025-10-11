import type { Gif } from "@/gifs/interfaces/gif.interface";
import { persist } from "zustand/middleware";
import { create } from "zustand";

import { toast } from "sonner";

interface GifsState {
  query: string;
  setQuery: (query: string) => void;
  prevTerms: string[];
  favoriteGifs: Gif[];
  addFavorite: (gif: Gif) => void;
  addFavorites: (gifs: Gif[]) => void;
  addPrevTerm: (term: string) => void;
  cleanTerms: () => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

export const useGifsStore = create<GifsState>()(
  persist(
    (set) => ({
      query: "",

      favoriteGifs: [],
      prevTerms: [],

      setQuery: (query: string) => set({ query }),

      addPrevTerm: (term: string) =>
        set((state) => {
          if (!state.prevTerms.includes(term)) {
            return { prevTerms: [...state.prevTerms, term] };
          }
          return state;
        }),

      cleanTerms: () => set({ prevTerms: [] }),

      addFavorite: (gif: Gif) =>
        set((state) => {
          if (state.favoriteGifs.some((g) => g.id === gif.id)) {
            return state;
          }
          toast("GIF agregado a favoritos");
          return {
            favoriteGifs: [...state.favoriteGifs, gif],
          };
        }),

      addFavorites: (gifs: Gif[]) =>
        set((state) => ({
          favoriteGifs: [...state.favoriteGifs, ...gifs],
        })),

      removeFavorite: (id: string) =>
        set((state) => ({
          favoriteGifs: state.favoriteGifs.filter((gif) => gif.id !== id),
        })),

      clearFavorites: () => set({ favoriteGifs: [] }),
    }),
    {
      name: "favorite-gifs-storage",
      partialize: (state) => ({
        favoriteGifs: state.favoriteGifs,
        prevTerms: state.prevTerms,
      }),
    },
  ),
);
