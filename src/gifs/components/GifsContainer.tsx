import type { FC } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { Download, Heart } from "lucide-react";
interface Props {
  gifs: Gif[];
}

export const GifsContainer: FC<Props> = ({ gifs }) => {
  // const handleDownload = (url: string) => {

  // }

  return (
    <>
      <div className="gifs-container">
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
                  <ButtonIcon variant="outline" tooltipText="Descargar" icon={Download} />
                  <ButtonIcon variant="outline" tooltipText="Guardar en favoritos" icon={Heart} />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
