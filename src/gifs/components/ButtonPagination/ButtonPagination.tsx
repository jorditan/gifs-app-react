import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination"
import type { Gif } from "@/gifs/interfaces/gif.interface";
import type { FC } from "react";

interface Props {
  gifs: Gif[];
  currentPage: number;
  fetch: boolean;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export const ButtonPagination: FC<Props> = ({ gifs, onNextClick, onPrevClick, currentPage }) => {
  return (
    <>
      <div className="pb-8">
        {gifs.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious data-testid="prev-btn"
                  className={`${currentPage === 1
                    ? "text-gray-500 cursor-not-allowed hover:bg-gray-600"
                    : "cursor-pointer"
                    }`} onClick={(e) => { e.preventDefault(); onPrevClick(); }} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className={`${currentPage === 1
                  ? "text-gray-500 cursor-not-allowed hover:bg-gray-600"
                  : "cursor-pointer"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onPrevClick();
                  }}
                >{currentPage - 1}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="bg-secondary text-secondary-foreground" >{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="cursor-pointer" onClick={(e) => { e.preventDefault(); onNextClick(); }} >{currentPage + 1}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className="cursor-pointer" onClick={(e) => { e.preventDefault(); onNextClick(); }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div >
    </>
  )
}
