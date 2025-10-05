import type { Gif } from "@/gifs/interfaces/gif.interface";
import { persist } from "zustand/middleware";
import { create } from "zustand";

import { toast } from "sonner";

interface GifsState {
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
      favoriteGifs: [],
      prevTerms: [],
      addPrevTerm: (term) => {
        set((state) => {
          if (!state.prevTerms.includes(term)) {
            return { prevTerms: [...state.prevTerms, term] };
          }
          return {};
        });
      },
      cleanTerms: () => {
        set(() => ({
          prevTerms: [],
        }));
      },
      addFavorite: (gif) => {
        set((state) => {
          if (state.favoriteGifs.some((g) => g.id === gif.id)) {
            return state;
          }
          toast("GIF agregado a favoritos");
          return {
            favoriteGifs: [...state.favoriteGifs, gif],
          };
        });
      },

      addFavorites: (gifs: Gif[]) => {
        gifs.forEach((gif) => {
          set((state) => ({ favoriteGifs: [...state.favoriteGifs, gif] }));
        });
      },
      removeFavorite: (id: string) =>
        set((state) => ({
          favoriteGifs: (state.favoriteGifs ?? []).filter(
            (gif) => gif.id !== id,
          ),
        })),
      clearFavorites: () => set({ favoriteGifs: [] }),
    }),
    {
      name: "favorite-gifs-storage",
    },
  ),
);
