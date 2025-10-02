import { GifsContainer } from "./gifs/components/GifsContainer"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/CustomHeader"
import { SearchBar } from "./shared/SearchBar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useGifs } from "./gifs/hooks/useGifs/useGifs"
import { FavoriteGifsContainer } from "./gifs/components/FavoriteGifsContainer"
import { useGifsStore } from "./store/useGifsStore"
import { CustomDropdownMenu } from "./shared/CustomDropdownMenu"
import { ButtonPagination } from "./gifs/components/ButtonPagination/ButtonPagination"

const queryClient = new QueryClient();

export const GifsApp = () => {
  const { handleSearch, previousTerms, gifs, handleDownload, handleNextPage, handlePrevPage, isFetching, page, handlePageSize, pageSize } = useGifs();

  const { favoriteGifs } = useGifsStore();
  return (
    <QueryClientProvider client={queryClient}>
      return (
      <>
        <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el GIF perfecto" />

        <div className="flex flex-row justify-center w-full gap-3">
          <SearchBar page={page} onQuery={handleSearch} placeholder="Buscar gif" />
          <CustomDropdownMenu onItemClick={handlePageSize} pageSize={pageSize} buttonText={`Límite: ${pageSize}`} items={[5, 10, 15, 20, 30, 40]} />
        </div>

        <PreviousSearches onLabelClick={handleSearch} searches={previousTerms} />

        <GifsContainer onDownloadClick={handleDownload} gifs={gifs} />

        <FavoriteGifsContainer gifs={favoriteGifs} onDownloadClick={handleDownload} />

        {gifs.length > 0 && (
          <ButtonPagination fetch={isFetching} currentPage={page + 1} onPrevClick={handlePrevPage} onNextClick={handleNextPage} gifs={gifs} />
        )}
      </>
    </QueryClientProvider>
  )
}
