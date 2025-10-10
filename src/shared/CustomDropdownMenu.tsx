import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Search } from "lucide-react";
import { type FC } from "react"
import { ButtonIcon } from "./ButtonIcon";

interface Props {
  buttonText: string,
  pageSize: number,
  items: number[],
  onItemClick: (newSize: number) => void;
}

export const CustomDropdownMenu: FC<Props> = ({ buttonText, items, onItemClick, pageSize }) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="md:inline-flex"
        >
          {buttonText}
        </Button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          {
            items.map((i) =>
              <DropdownMenuItem key={i} className={`${i === pageSize
                ? "bg-primary text-secondary"
                : "cursor-pointer"
                }`} onClick={() => onItemClick(i)}>
                {i}
                {
                  i === pageSize && (<Check />)
                }
              </DropdownMenuItem>
            )
          }

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
