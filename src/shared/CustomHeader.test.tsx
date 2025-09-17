import { describe, expect, test } from "vitest"
import { CustomHeader } from "./CustomHeader"
import { render, screen } from "@testing-library/react"

describe('CustomHeader', () => {
  const title = "Test title"
  test('should render the title correctly', () => {

    render(<CustomHeader title={title} />)

    expect(screen.getByText(title)).toBeDefined();
  })

  test('should the descripcion when provided', () => {
    const description = "Test description"

    render(<CustomHeader title={title} description={description} />)

    expect(screen.getByText(description)).toBeDefined();
  })
})