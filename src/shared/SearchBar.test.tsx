import { describe, expect, test, vi } from "vitest"
import { SearchBar } from "./SearchBar"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

describe('SearchBar', () => {
  test('should render searchbar correctly', () => {
    const { container } = render(<SearchBar onQuery={() => { }} placeholder={""} />)

    expect(container).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  })

  test('should call onQuery with the correct value after 700ms', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} placeholder={""} />)

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledWith('test')
    })
  })

  test('should call only once with the las value (debounce)', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} placeholder={""} />)

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 't' } });
    fireEvent.change(input, { target: { value: 'te' } });
    fireEvent.change(input, { target: { value: 'tes' } });
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledWith('test')
      expect(onQuery).toHaveBeenCalledTimes(1)
    })
  })

  test('should call onQuery when button clicked with the input value', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} placeholder={""} />)

    const button = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(button);

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1);
      expect(onQuery).toHaveBeenCalledWith('test')
    })
  })

  test('should the input has the correct placeholder value', () => {
    const placeholderValue = "buscar";
    render(<SearchBar onQuery={() => { }} placeholder={placeholderValue} />)

    expect(screen.getByPlaceholderText(placeholderValue));
  })

  test('should call onQuery when key "Enter" is called', () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} placeholder={""} />)

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(onQuery).toHaveBeenCalledTimes(1);
  })
})