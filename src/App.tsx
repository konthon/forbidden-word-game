import { ChakraProvider, theme } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { connectAuthEmulator } from 'firebase/auth'
import { connectDatabaseEmulator } from 'firebase/database'

import type { FC } from 'react'

import { HomePage } from 'pages/home'
import { firebaseApp, firebaseAuth, firebaseDatabase } from 'libs/Firebase'
import { getAnalytics } from 'firebase/analytics'
import { useAuthState } from 'hooks/useAuthState'

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

export const App: FC = () => {
  useAuthState()
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </ChakraProvider>
  )
}
