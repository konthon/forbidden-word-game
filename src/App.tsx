import { ChakraProvider, theme } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

import { HomePage } from 'pages/home'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  </ChakraProvider>
)
