import { describe, expect, test } from "vitest";
import { useGifsStore } from "./useGifsStore";
import { act, renderHook } from "@testing-library/react";
import { mockGifs } from "../mock-data/gifs.mock";

describe("useGifsStore", () => {
  test("should return a list of favorite gifs", () => {
    const { result } = renderHook(() => useGifsStore());

    expect(result.current.favoriteGifs).toBeTruthy();
  });

  test("should add a favorite gif when addFavorite is called", () => {
    const { result } = renderHook(() => useGifsStore());

    act(() => {
      result.current.addFavorite(mockGifs[0]);
    });

    expect(result.current.favoriteGifs.length).toBe(1);
  });

  test("should remove all favorite gifs when cleanFavorite is called", () => {
    const { result } = renderHook(() => useGifsStore());

    act(() => {
      result.current.addFavorites(mockGifs);
    });

    expect(result.current.favoriteGifs.length).toBe(7);
  });

  test("should remove a favorite gif when removeFavorite is called", () => {
    const { result } = renderHook(() => useGifsStore());

    act(() => {
      result.current.addFavorites(mockGifs);
    });

    const id = mockGifs[0].id;

    act(() => {
      result.current.removeFavorite(id);
    });

    expect(
      result.current.favoriteGifs.some((gif) => gif.id === id),
    ).toBeFalsy();
  });

  test("should add a term when addPrevTerms is called", () => {
    const { result } = renderHook(() => useGifsStore());

    act(() => {
      result.current.addPrevTerm("Goku");
    });

    expect(result.current.prevTerms.length).toBe(1);
  });

  test("should clean previous terms when cleanPrevTerms is called", () => {
    const { result } = renderHook(() => useGifsStore());

    act(() => {
      result.current.addPrevTerm("Goku");
    });

    act(() => {
      result.current.addPrevTerm("Dragon ball");
    });

    act(() => {
      result.current.addPrevTerm("Saitama");
    });

    act(() => {
      result.current.cleanTerms();
    });

    expect(result.current.prevTerms.length).toBe(0);
  });

  test("should not add a prevTerm when the terms has been searched previously", () => {
    const { result } = renderHook(() => useGifsStore());

    act(() => {
      result.current.addPrevTerm("Goku");
    });

    act(() => {
      result.current.addPrevTerm("Goku");
    });

    expect(result.current.prevTerms.length).toBe(1);
  });
});
