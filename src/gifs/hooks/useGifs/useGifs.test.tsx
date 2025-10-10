import { act, renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { afterEach, beforeEach, describe, expect, test, vi, type Mock, beforeAll } from "vitest"
import { useGifs } from './useGifs'
import * as gifsActions from "../../actions/get-gifs-query.action";
import type { Gif } from "@/gifs/interfaces/gif.interface"

vi.mock('../../actions/get-gifs-query.action', () => ({
  getGifsByQuery: vi.fn(),
}))

vi.mock('sonner', () => ({ toast: vi.fn() }))

beforeAll(() => {
  Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });
});


describe('useGifs', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  global.fetch = vi.fn().mockResolvedValue({
    blob: async () => new Blob(['gif-bytes'], { type: 'image/gif' }),
    headers: new Headers({ 'Content-Type': 'image/gif' }),
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  test('should render default values and methods', () => {
    const { result } = renderHook(() => useGifs(), { wrapper });

    expect(result.current.handleQuerySearch).toBeDefined();
    expect(result.current.handleNextPage).toBeDefined();
    expect(result.current.handlePrevPage).toBeDefined();
  })

  afterEach(() => {
    queryClient.clear()
    vi.clearAllMocks()
  })

  test('should return a list of gifs', async () => {
    (gifsActions.getGifsByQuery as Mock).mockResolvedValue([]);

    (gifsActions.getGifsByQuery as Mock).mockResolvedValueOnce([
      { id: '1', title: 'cat', url: 'https://...' },
      { id: '2', title: 'cat2', url: 'https://...' },
    ]);

    const { result } = renderHook(() => useGifs(), { wrapper })

    act(() => {
      result.current.handleQuerySearch('Cats')
    })

    await waitFor(() => {
      expect(result.current.isFetching).toBeFalsy()
    })

    expect(result.current.gifs[0].id).toBe('1')
    expect(gifsActions.getGifsByQuery).toHaveBeenCalledWith('cats', 0, 10)
  })


  test('should prefetch a list of page when handleQuerySearch is called', async () => {
    const queryClient = new QueryClient()
    const spy = vi.spyOn(queryClient, "prefetchQuery")

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result } = renderHook(() => useGifs(), { wrapper })

    act(() => {
      result.current.handleQuerySearch("john cena");
    })

    act(() => {
      result.current.handleNextPage();
    })

    await waitFor(() => {
      expect(spy).toBeCalled();
    })
  })

  test('should download a gif when handleDownlad is called', async () => {
    const { result } = renderHook(() => useGifs(), { wrapper })

    const gif = { id: '2', title: 'no type', url: 'https://cdn.example/asset' } as Gif

    await act(async () => {
      result.current.handleDownload(gif)
    })

    expect(global.fetch).toHaveBeenCalledWith('https://cdn.example/asset')
  })


  test('should advance to next page when handleNextPage is called', async () => {
    const { result } = renderHook(() => useGifs(), { wrapper })

    await act(async () => {
      result.current.handleNextPage();
    })

    expect(result.current.page).toBe(1);
  })

  test('should back to prev page when handlePrevPage is called', async () => {
    const { result } = renderHook(() => useGifs(), { wrapper })

    await act(async () => {
      result.current.handleNextPage();
    })

    await act(async () => {
      result.current.handlePrevPage();
    })

    expect(result.current.page).toBe(0);
  })

  test('should set pageSize when handlePageSize is called', async () => {
    const { result } = renderHook(() => useGifs(), { wrapper })
    const newPageSize = 40;

    await act(async () => {
      result.current.handlePageSize(newPageSize);
    })

    expect(result.current.pageSize).toBe(newPageSize);
  })
})