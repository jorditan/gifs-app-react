import { act, renderHook } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import { useGifs } from "./useGifs"
import * as gifsActions from "../actions/get-gifs-query.action"


describe('useGifs', () => {
  test('should render default values and methods', () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.currentGifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();

  })

  test('should return a list of gifs', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch('goku');
    })

    expect(result.current.currentGifs.length).toBe(10);
  })

  test('should return a list of gifs when handleTermClick is called', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked('goku');
    })

    expect(result.current.currentGifs.length).toBe(10);
  })

  test('should return a list of gifs from cache', async () => {
    const { result } = renderHook(() => useGifs())

    await act(async () => {
      await result.current.handleTermClicked('goku');
    })

    vi.spyOn(gifsActions, 'getGifsByQuery')
      .mockRejectedValue(new Error('Esto es un error'));

    expect(result.current.currentGifs.length).toBe(10);
  })

  test('should return no more than 8 previous terms', async () => {
    const { result } = renderHook(() => useGifs())

    vi.spyOn(gifsActions, 'getGifsByQuery')
      .mockResolvedValue([]);

    for (let i = 1; i <= 9; i++) {
      await act(async () => {
        await result.current.handleSearch(`Goku${i}`);
      });
    }

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual([
      "goku9", "goku8", "goku7", "goku6", "goku5", "goku4", "goku3", "goku2",
    ]);
  })

})