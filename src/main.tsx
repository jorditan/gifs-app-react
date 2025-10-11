import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "./components/ui/sonner"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from './routes/routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
