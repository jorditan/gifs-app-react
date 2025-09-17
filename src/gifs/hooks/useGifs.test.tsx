import { act, renderHook } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { useGifs } from "./useGifs"

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
})