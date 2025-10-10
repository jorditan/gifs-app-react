import { type LucideProps } from "lucide-react"

interface Props {
  tooltipText: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  variant: "outline" | "link" | "default" | "destructive" | "secondary" | "ghost" | null | undefined;
  handleAction?: () => void;
  className?: string;
}

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"

export function ButtonIcon(props: Props & { tooltipDefaultOpen?: boolean }) {
  return (
    <Tooltip defaultOpen={props.tooltipDefaultOpen}>
      <TooltipTrigger asChild>
        <Button className={props.className} onClick={props.handleAction} variant={props.variant} size="icon" >
          <props.icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent data-testid="button-icon-tooltip">
        {props.tooltipText}
      </TooltipContent>
    </Tooltip>
  )
}
