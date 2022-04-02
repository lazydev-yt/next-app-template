import type { GlobalProvider } from '@ladle/react'
import { ChakraProvider } from '@chakra-ui/react'

import * as React from 'react'

export const Provider: GlobalProvider = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>
}
