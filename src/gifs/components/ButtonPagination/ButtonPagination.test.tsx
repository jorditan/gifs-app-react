import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/vitest';
import { describe, expect, test, vi } from "vitest"
import { ButtonPagination } from "./ButtonPagination"
import { mockGifs } from "@/mock-data/gifs.mock"

describe('ButtonPagination', () => {
  const onPrevClick = vi.fn()
  const onNextClick = vi.fn()

  test('should render a component', () => {
    const component = render(<ButtonPagination
      gifs={[]}
      currentPage={0}
      fetch={false}
      onNextClick={() => { }}
      onPrevClick={() => { }}
    />);

    expect(component).toBeDefined();
  })

  test('should exist 3 number buttons of pagination', () => {
    render(<ButtonPagination
      gifs={mockGifs}
      currentPage={0}
      fetch={false}
      onNextClick={() => { }}
      onPrevClick={() => { }}
    />);

    const prevNumberButton = screen.getByText('-1');
    const currentNumberButton = screen.getByText('0');
    const nextNumberButton = screen.getByText('1');

    expect(prevNumberButton).toBeDefined()
    expect(currentNumberButton).toBeDefined()
    expect(nextNumberButton).toBeDefined()
  })

  test('should exist 2 text buttons of pagination', () => {
    render(<ButtonPagination
      gifs={mockGifs}
      currentPage={0}
      fetch={false}
      onNextClick={() => { }}
      onPrevClick={() => { }}
    />);

    const prevButton = screen.getByText('Anterior');
    const currentButton = screen.getByText('Siguiente');

    expect(prevButton).toBeDefined()
    expect(currentButton).toBeDefined()
  })



  test('should onPrevClick called when prevButton is called', () => {
    render(<ButtonPagination
      gifs={mockGifs}
      currentPage={0}
      fetch={false}
      onNextClick={onNextClick}
      onPrevClick={onPrevClick}
    />);

    const prevButton = screen.getByText('Anterior');

    fireEvent.click(prevButton);

    expect(onPrevClick).toHaveBeenCalled();
  })

  test('should onNextClick called when prevButton is called', () => {
    render(<ButtonPagination
      gifs={mockGifs}
      currentPage={0}
      fetch={false}
      onNextClick={onNextClick}
      onPrevClick={onPrevClick}
    />);

    const nextButton = screen.getByText('Siguiente');

    fireEvent.click(nextButton);

    expect(onNextClick).toHaveBeenCalled();
  })

  test('should onNextClick called when nextNumberButton is called', () => {
    const currentPageState = 0

    render(<ButtonPagination
      gifs={mockGifs}
      currentPage={currentPageState}
      fetch={false}
      onNextClick={onNextClick}
      onPrevClick={onPrevClick}
    />);


    const nextNumberButton = screen.getByText(`${currentPageState + 1}`);

    fireEvent.click(nextNumberButton);

    expect(onNextClick).toHaveBeenCalled();
  })

  test('should onPrevClick called when prevNumberButton is called', () => {
    const currentPageState = 1

    render(<ButtonPagination
      gifs={mockGifs}
      currentPage={currentPageState}
      fetch={false}
      onNextClick={onNextClick}
      onPrevClick={onPrevClick}
    />);

    const prevNumberButton = screen.getByText(`${currentPageState - 1}`);

    fireEvent.click(prevNumberButton);

    expect(onPrevClick).toHaveBeenCalled();
  })

  test('should apply gray text and cursor not allowed on prevButton when page=1', () => {
    const currentPageState = 1

    render(<ButtonPagination
      gifs={mockGifs}
      currentPage={currentPageState}
      fetch={false}
      onNextClick={onNextClick}
      onPrevClick={onPrevClick}
    />);

    const prev = screen.getByTestId('prev-btn')
    const prevNumberButton = screen.getByText(`${currentPageState - 1}`);

    expect(prev).toHaveClass('text-gray-500', 'cursor-not-allowed')
    expect(prev).not.toHaveClass('cursor-pointer')
    expect(prevNumberButton).toHaveClass('text-gray-500', 'cursor-not-allowed')
    expect(prevNumberButton).not.toHaveClass('cursor-pointer')
  })

})