import { ChakraProvider, theme } from '@chakra-ui/react'
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getAnalytics } from 'firebase/analytics'
import { connectAuthEmulator } from 'firebase/auth'
import { connectDatabaseEmulator } from 'firebase/database'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import type { FC, PropsWithChildren } from 'react'

import { MINUTE } from 'config/constants'
import { HomePage } from 'pages/home'
import { useAuthState } from 'hooks/useAuthState'
import { useFeedback } from 'hooks/useFeedback'
import { firebaseApp, firebaseAuth, firebaseDatabase } from 'libs/Firebase'

getAnalytics(firebaseApp)

if (
  process.env.NODE_ENV === 'development' &&
  window.location.hostname === 'localhost'
) {
  connectAuthEmulator(firebaseAuth, 'http://localhost:9099', {
    disableWarnings: true,
  })
  connectDatabaseEmulator(firebaseDatabase, 'localhost', 9000)
}

const QueryClientWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { error } = useFeedback()
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 5 * MINUTE,
          },
          mutations: {
            retry: 1,
          },
        },
        mutationCache: new MutationCache({
          onError: (err) => {
            error(err)
          },
        }),
      })
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export const App: FC = () => {
  useAuthState()
  return (
    <ChakraProvider theme={theme}>
      <QueryClientWrapper>
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientWrapper>
    </ChakraProvider>
  )
}
