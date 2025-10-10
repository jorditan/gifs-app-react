import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import type { FC } from "react";
import { Link } from "react-router-dom"

interface Props {
  title: string;
}

export const CustomTitle: FC<Props> = ({ title }) => {
  return (
    <>
      <div className="flex justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">
                <BreadcrumbLink>Inicio</BreadcrumbLink></Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/favorites">
                <BreadcrumbLink>{title}</BreadcrumbLink></Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  )
}
