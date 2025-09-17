import { GifsContainer } from "./gifs/components/GifsContainer"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/CustomHeader"
import { SearchBar } from "./shared/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {
  const { handleSearch, handleTermClicked, previousTerms, currentGifs } = useGifs();

  return (
    <>
      <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el GIF perfecto" />

      <SearchBar onQuery={handleSearch} placeholder="Buscar gif" />

      <PreviousSearches onLabelClick={handleTermClicked} searches={previousTerms} />

      <GifsContainer gifs={currentGifs} />
    </>
  )
}
