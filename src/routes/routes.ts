import { FavoriteGifsView } from "@/views/FavoriteGifsView";
import { SearchGifsView } from "@/views/SearchGifsView";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  { path: "/", Component: SearchGifsView },
  { path: "/favorites", Component: FavoriteGifsView },
];
