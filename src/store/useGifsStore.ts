import type { Gif } from "@/gifs/interfaces/gif.interface";
import { create } from "zustand";
import { toast } from "sonner";

interface GifsState {
  favoriteGifs: Gif[];
  addFavorite: (gif: Gif) => void;
  addFavorites: (gifs: Gif[]) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

export const useGifsStore = create<GifsState>((set) => ({
  favoriteGifs: [],
  addFavorite: (gif) => {
    set((state) => ({ favoriteGifs: [...state.favoriteGifs, gif] }));
    toast("GIF agregado a favoritos");
  },
  addFavorites: (gifs: Gif[]) => {
    gifs.forEach((gif) => {
      set((state) => ({ favoriteGifs: [...state.favoriteGifs, gif] }));
    });
  },
  removeFavorite: (id) =>
    set((state) => ({
      favoriteGifs: state.favoriteGifs.filter((gif) => gif.id !== id),
    })),
  clearFavorites: () => set({ favoriteGifs: [] }),
}));
