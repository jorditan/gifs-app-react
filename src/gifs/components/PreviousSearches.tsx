import { Badge } from "@/components/ui/badge";
import type { FC } from "react"

interface Props {
  searches: string[],

  onLabelClick: (term: string) => void;
}

export const PreviousSearches: FC<Props> = ({ searches, onLabelClick }) => {
  return (
    <>
      <div className="previous-searches">
        <h2>Búsquedas previas</h2>
        <ul className="previous-searches-list">
          {
            searches.map(term => (
              <Badge className="cursor-pointer" variant="outline" key={term} onClick={() => onLabelClick(term)}>{term}</Badge>
            ))
          }
        </ul>
        <Badge content="hola" />
      </div>
    </>
  )
}
