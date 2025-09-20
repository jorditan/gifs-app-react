import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination"
import type { Gif } from "../interfaces/gif.interface";
import type { FC } from "react";

interface Props {
  gifs: Gif[];
  onNextClick: (page: number) => void;
  onPrevClick: (page: number) => void;
}

export const ButtonPagination: FC<Props> = ({ gifs, onNextClick, onPrevClick }) => {
  return (
    <>
      <div className="pb-8">
        {gifs.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => onNextClick} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink >1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => onPrevClick} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div >
    </>
  )
}
