import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GifsApp } from './GifsApp'
import { Toaster } from "@/components/ui/sonner"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GifsApp />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    {/* <MyCounterApp /> */}
  </StrictMode>
)
