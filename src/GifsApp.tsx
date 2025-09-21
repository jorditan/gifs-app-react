import { GifsContainer } from "./gifs/components/GifsContainer"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/CustomHeader"
import { SearchBar } from "./shared/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"
import { ButtonPagination } from "./gifs/components/ButtonPagination"
import { FavoriteGifsContainer } from "./gifs/components/FavoriteGifsContainer"
import { useGifsStore } from "./store/useGifsStore"
import { CustomDropdownMenu } from "./shared/CustomDropdownMenu"

export const GifsApp = () => {
  const { handleSearch, handleTermClicked, previousTerms, gifs, handleDownload, handleNextPage, handlePrevPage, isFetching, page, handlePageSize, pageSize } = useGifs();

  const { favoriteGifs } = useGifsStore();
  return (
    <>
      <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el GIF perfecto" />

      <div className="flex flex-row justify-center w-full gap-3">
        <SearchBar page={page} onQuery={handleSearch} placeholder="Buscar gif" />
        <CustomDropdownMenu onItemClick={handlePageSize} pageSize={pageSize} buttonText={`Límite: ${pageSize}`} items={[5, 10, 15, 20, 30, 40]} />
      </div>

      <PreviousSearches onLabelClick={handleTermClicked} searches={previousTerms} />

      <GifsContainer onDownloadClick={handleDownload} gifs={gifs} />

      <FavoriteGifsContainer gifs={favoriteGifs} onDownloadClick={handleDownload} />

      {gifs.length > 0 && (
        <ButtonPagination fetch={isFetching} currentPage={page} onPrevClick={handlePrevPage} onNextClick={handleNextPage} gifs={gifs} />
      )}
    </>
  )
}
