import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import { ButtonIcon } from "./ButtonIcon"
import { Download } from "lucide-react";


describe('ButtonIcon', () => {
  test('should render ButtonIcon correctly', () => {
    const { container } = render(<ButtonIcon tooltipText={""} icon={Download} handleAction={() => { }} variant={"default"} />)

    expect(container).toMatchSnapshot()
    expect(screen.getByRole('button')).toBeDefined();
  })

  test('should handleAction callend when button is clicked', () => {
    const handleAction = vi.fn();

    render(<ButtonIcon tooltipText={""} icon={Download} handleAction={handleAction} variant={"default"} />)

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleAction).toBeCalled();
  })

  // test('should render tooltip content correctly', async () => {
  //   const tooltipContent = "Hola soy un tooltip"
  //   render(<ButtonIcon tooltipText={tooltipContent} icon={Download} handleAction={() => { }} variant={"default"} />)
  //   expect(await screen.findByRole('tooltip')).toHaveTextContent(tooltipContent);
  // })
})