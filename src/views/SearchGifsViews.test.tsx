import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from '../routes/routes'

describe('GifsApp', () => {
  test('shold render component properly', () => {
    const queryClient = new QueryClient();
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    )

    expect(container).toMatchSnapshot();
  })
})