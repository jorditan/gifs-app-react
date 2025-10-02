import { ButtonPagination } from "@/gifs/components/ButtonPagination/ButtonPagination";
import { FavoriteGifsContainer } from "@/gifs/components/FavoriteGifsContainer";
import { useGifs } from "@/gifs/hooks/useGifs/useGifs";
import { CustomHeader } from "@/shared/CustomHeader";
import { CustomTitle } from "@/shared/CustomTitle";
import { SearchBar } from "@/shared/SearchBar";
import { useGifsStore } from "@/store/useGifsStore";

export const FavoriteGifsView = () => {
  const { handleSearch, gifs, handleDownload, handleNextPage, handlePrevPage, isFetching, page, } = useGifs();

  const { favoriteGifs } = useGifsStore();
  return (
    <section aria-label="Gifs content" className="flex justify-center mt-9 mb-9">
      <article className="w-[80%] flex flex-col justify-center">
        <CustomTitle title="Mis favoritos" />

        <CustomHeader title="Encuentra tus gifs favoritos" description="Encuentra tus gis favoritos" />

        <div className="flex flex-row justify-center w-full gap-3">
          <SearchBar page={page} onQuery={handleSearch} placeholder="Buscar gif" />
        </div>

        <FavoriteGifsContainer gifs={favoriteGifs} onDownloadClick={handleDownload} />

        {gifs.length > 0 && (
          <ButtonPagination fetch={isFetching} currentPage={page + 1} onPrevClick={handlePrevPage} onNextClick={handleNextPage} gifs={gifs} />
        )}
      </article>

    </section>
  )
}