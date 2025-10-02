import { PreviousSearches } from "../gifs/components/PreviousSearches"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { GifsContainer } from "@/gifs/components/GifsContainer"
import { useGifs } from "@/gifs/hooks/useGifs/useGifs";
import { CustomHeader } from "@/shared/CustomHeader";
import { SearchBar } from "@/shared/SearchBar";
import { CustomDropdownMenu } from "@/shared/CustomDropdownMenu";
import { ButtonPagination } from "@/gifs/components/ButtonPagination/ButtonPagination";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGifsStore } from "@/store/useGifsStore";

const queryClient = new QueryClient();

export const SearchGifsView = () => {
  const { handleSearch, previousTerms, gifs, handleDownload, handleNextPage, handlePrevPage, isFetching, page, handlePageSize, pageSize } = useGifs();

  const { favoriteGifs } = useGifsStore();

  return (
    <QueryClientProvider client={queryClient}>
      <section aria-label="Gifs content" className="flex justify-center mt-9 mb-9">
        <article className="w-[80%] flex flex-col justify-center">
          <div className="flex justify-between">
            <h1>Gifs app</h1>
            <Link to="favorites">
              <Button variant="secondary">{`Mis favoritos (${favoriteGifs.length})`}</Button>
            </Link>

          </div>

          <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el GIF perfecto" />

          <div className="flex flex-row justify-center w-full gap-3">
            <SearchBar page={page} onQuery={handleSearch} placeholder="Buscar gif" />
            <CustomDropdownMenu onItemClick={handlePageSize} pageSize={pageSize} buttonText={`Límite: ${pageSize}`} items={[5, 10, 15, 20, 30, 40]} />
          </div>

          <PreviousSearches onLabelClick={handleSearch} searches={previousTerms} />

          <GifsContainer onDownloadClick={handleDownload} gifs={gifs} />

          {gifs.length > 0 && (
            <ButtonPagination fetch={isFetching} currentPage={page + 1} onPrevClick={handlePrevPage} onNextClick={handleNextPage} gifs={gifs} />
          )}
        </article>

      </section>
    </QueryClientProvider>
  )
}
