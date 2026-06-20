import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

// Create QueryClient with caching configuration (Req 19.1, 19.2)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed requests up to 3 times (Req 17.3)
      retry: 3,
      // Exponential backoff for retries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Cache data for 5 minutes by default (Req 19.2)
      gcTime: 5 * 60 * 1000,
      // Data is considered stale after 5 minutes (Req 19.2)
      staleTime: 5 * 60 * 1000,
      // Prevent automatic refetching on window focus for better UX
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
