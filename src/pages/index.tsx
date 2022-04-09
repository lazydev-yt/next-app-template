import * as React from 'react'
import { Box, Button, Container, Text, useToast } from '@chakra-ui/react'
import { TopBar } from 'components/TopBar/TopBar'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useAuth } from 'lib/auth'
import axios from 'axios'

const Index = () => {
  const auth = useAuth()

  return (
    <Box>
      <TopBar />

      <Container maxW='container.lg'>
        {auth.isAuthenticated && <Text>User is Authenticated</Text>}
      </Container>
    </Box>
  )
}

export default Index
