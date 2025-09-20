import { toast } from "sonner"
import { Download, Heart } from "lucide-react";

import type { FC } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { ButtonIcon } from "../../shared/ButtonIcon";

interface Props {
  gifs: Gif[];
  onDownloadClick: (gif: Gif) => void;
}

export const GifsContainer: FC<Props> = ({ gifs, onDownloadClick }) => {

  const handleFav = () => {
    toast('GIF guardado en favoritos')
  }

  return (
    <>
      <div className="gifs-container b-4">
        {
          gifs.map((gif) => (
            <div key={gif.id} className="gif-card flex gap-4">
              <img src={gif.url} alt={gif.title} />
              <h3>{gif.title}</h3>
              <div className="flex flex-column gap-4 items-center justify-around">
                <p>
                  {gif.width} x {gif.height}
                </p>
                <div className="flex gap-2">
                  <ButtonIcon handleAction={() => onDownloadClick(gif)} variant="outline" tooltipText="Descargar" icon={Download} />
                  <ButtonIcon handleAction={() => handleFav()} variant="outline" tooltipText="Guardar en favoritos" icon={Heart} />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
