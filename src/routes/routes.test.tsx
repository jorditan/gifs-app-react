import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router-dom";
import { SearchGifsView } from "../views/SearchGifsView";
import { FavoriteGifsView } from "../views/FavoriteGifsView";

import { describe, test, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({});

describe("App routes", () => {
  test("should render SearchGifsView at root path", () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: SearchGifsView,
      },
    ]);

    render(
      <QueryClientProvider client={queryClient}>
        <Stub initialEntries={["/"]} />;
      </QueryClientProvider>
    )

    expect(screen.getByText("Buscador de gifs 🔍")).toBeDefined();
  });

  test("should renders FavoriteGifsView at second path", () => {
    const Stub = createRoutesStub([
      {
        path: "/favorites",
        Component: FavoriteGifsView,
      },
    ]);

    render(
      <QueryClientProvider client={queryClient}>
        <Stub initialEntries={["/favorites"]} />;
      </QueryClientProvider>
    )

    expect(screen.getByText("Mis gifs favoritos ❤️")).toBeDefined();
  });

});
