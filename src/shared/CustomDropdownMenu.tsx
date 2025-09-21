import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { FC } from "react"

interface Props {
  buttonText: string,
  items: number[],
}

export const CustomDropdownMenu: FC<Props> = ({ buttonText, items }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          {
            items.map((i) =>
              <DropdownMenuItem>
                {i}
              </DropdownMenuItem>
            )
          }

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
