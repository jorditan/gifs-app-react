import { GifsContainer } from "./gifs/GifsContainer"
import { PreviousSearches } from "./gifs/PreviousSearches"
import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/CustomHeader"
import { SearchBar } from "./shared/SearchBar"

export const GifsApp = () => {
  return (
    <>
      <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el GIF perfecto" />

      <SearchBar placeholder="Buscar gif" />

      <PreviousSearches searches={['Goku', 'Dragon ball']} />

      <GifsContainer gifs={mockGifs} />
    </>
  )
}
