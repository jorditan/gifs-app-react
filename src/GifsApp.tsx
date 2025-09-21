import { GifsContainer } from "./gifs/components/GifsContainer"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/CustomHeader"
import { SearchBar } from "./shared/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"
import { ButtonPagination } from "./gifs/components/ButtonPagination"
import { CustomDropdownMenu } from "./shared/CustomDropdownMenu"

export const GifsApp = () => {
  const { handleSearch, handleTermClicked, previousTerms, gifs, handleDownload, handleNextPage, handlePrevPage, isFetching, page } = useGifs();
  return (
    <>
      <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el GIF perfecto" />

      <SearchBar page={page} onQuery={handleSearch} placeholder="Buscar gif" />

      <PreviousSearches onLabelClick={handleTermClicked} searches={previousTerms} />

      <GifsContainer onDownloadClick={handleDownload} gifs={gifs} />


      {gifs.length > 0 && (
        <ButtonPagination fetch={isFetching} currentPage={page} onPrevClick={handlePrevPage} onNextClick={handleNextPage} gifs={gifs} />
      )}
    </>
  )
}
