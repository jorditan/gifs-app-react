import { Badge } from "@/components/ui/badge";
import { ButtonIcon } from "@/shared/ButtonIcon";
import { Trash } from "lucide-react";
import type { FC } from "react"

interface Props {
  searches: string[],

  onLabelClick: (term: string) => void;
  onButtonClick: () => void;
}

export const PreviousSearches: FC<Props> = ({ searches, onLabelClick, onButtonClick }) => {
  return (
    <>
      <div className="previous-searches">
        <h2>Búsquedas previas</h2>
        <div className="flex gap-2">
          <ul className="previous-searches-list">
            {
              searches.map(term => (
                <Badge className="cursor-pointer" variant="outline" key={term} onClick={() => onLabelClick(term)}>{term}</Badge>
              ))
            }
          </ul>
          {
            searches.length > 0 && (
              <ButtonIcon
                tooltipText="Limpiar"
                icon={Trash}
                variant="default"
                handleAction={onButtonClick}
              />
            )
          }
        </div>
        <Badge content="hola" />
      </div>
    </>
  )
}
