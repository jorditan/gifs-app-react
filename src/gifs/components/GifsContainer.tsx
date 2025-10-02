import { Download, Heart, HeartOff } from "lucide-react";
import type { FC } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { useGifsStore } from "@/store/useGifsStore";

interface Props {
  gifs: Gif[];
  onDownloadClick: (gif: Gif) => void;
}

export const GifsContainer: FC<Props> = ({ gifs, onDownloadClick }) => {
  const { addFavorite, favoriteGifs } = useGifsStore()

  return (
    <>
      {
        gifs.length == 0 && <p className="text-sm text-muted text-center w-full">Aquí veras los GIF´s que busques</p>
      }
      <div className="gifs-container b-4">
        {
          gifs.map((gif) => (
            <div key={gif.id} className="gif-card flex gap-4">
              <img src={gif.url} alt={gif.title} />

              <h3>{gif.title} <span className="text-xs">
                ({gif.width} x {gif.height} px)
              </span></h3>

              <div className="flex flex-column gap-4 items-center justify-around">
                <div className="flex gap-2">
                  <ButtonIcon handleAction={() => onDownloadClick(gif)} variant="outline" tooltipText="Descargar" icon={Download} />

                  <ButtonIcon handleAction={() => addFavorite(gif)} variant="outline" tooltipText={favoriteGifs.includes(gif) ? "Quitar de favoritos" : "Guardar en favoritos"} icon={favoriteGifs.includes(gif) ? HeartOff : Heart}
                  />
                </div>
              </div>
            </div>
          ))
        }
      </div>

    </>
  )
}
