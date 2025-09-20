import { GifsContainer } from "./gifs/components/GifsContainer"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/CustomHeader"
import { SearchBar } from "./shared/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "./components/ui/pagination"

export const GifsApp = () => {
  const { handleSearch, handleTermClicked, previousTerms, gifs, handleDownload, handleNextPage, handlePrevPage, isFetching, page } = useGifs();
  return (
    <>
      <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el GIF perfecto" />

      <SearchBar onQuery={handleSearch} placeholder="Buscar gif" />

      <PreviousSearches onLabelClick={handleTermClicked} searches={previousTerms} />

      <GifsContainer onDownloadClick={handleDownload} gifs={gifs} />

      {/* <ButtonPagination onPrevClick={handlePrevPage} onNextClick={handleNextPage} gifs={gifs} /> */}
      {gifs.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePrevPage(); }} />
            </PaginationItem>
            <span className="px-3 text-sm opacity-70">Página {page} {isFetching && "· actualizando..."}</span>
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handleNextPage(); }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}
