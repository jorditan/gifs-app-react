import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GifsApp } from './GifsApp'

describe('GifsApp', () => {
  test('shold render component properly', () => {
    const queryClient = new QueryClient();
    const { container } = render(<QueryClientProvider client={queryClient}><GifsApp /></QueryClientProvider>)

    expect(container).toMatchSnapshot();
  })
})