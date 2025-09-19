import { type LucideProps } from "lucide-react"

interface Props {
  tooltipText: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  variant: "outline" | "link" | "default" | "destructive" | "secondary" | "ghost" | null | undefined;
}

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"

export function ButtonIcon(props: Props) {
  return (
    <Tooltip >
      <TooltipTrigger>
        <Button variant={props.variant} size="icon" className="size-8">
          <props.icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {props.tooltipText}
      </TooltipContent>
    </Tooltip>
  )
}
