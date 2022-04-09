import {
  Box,
  Button,
  Container,
  IconButton,
  Text,
  Tooltip,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import * as React from 'react'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { WalletOptionsModal } from 'components/WalletOptionsModal'
import * as ga from 'lib/ga'
import { TopBarView } from './TopBarView'
import { SiweMessage } from 'siwe'
import { useAuth } from 'lib/auth'
import axios from 'axios'

interface TopBarProps {}

export const TopBar: React.FC<TopBarProps> = ({ children }) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = React.useState(false)
  const [{ data: accountData }, disconnect] = useAccount()
  const [{ data: networkData }] = useNetwork()
  const { colorMode, toggleColorMode } = useColorMode()
  const [, signMessage] = useSignMessage()
  const auth = useAuth()
  const toast = useToast()

  const handleDisconnect = () => {
    ga.event({
      action: 'wallet-disconnected',
      params: {},
    })
    disconnect()
    auth.logout()
  }

  const signIn = async () => {
    try {
      const address = accountData?.address
      const chainId = networkData?.chain?.id
      if (!address || !chainId) {
        console.log('address or chainId is undefined', { address, chainId })
        return
      }

      const nonceRes = await axios.get('/api/nonce')
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: nonceRes.data,
      })
      const signRes = await signMessage({ message: message.prepareMessage() })
      if (signRes.error) {
        throw signRes.error
      }

      auth.login(message, signRes.data)
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  React.useEffect(() => {
    if (accountData) {
      ga.event({
        action: 'wallet-connected',
        params: {
          wallet: accountData.connector.name,
        },
      })
    }
  }, [accountData])

  return (
    <>
      <TopBarView
        logo='Web3App'
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        onDisconnect={handleDisconnect}
        onOpenWalletConnect={() => setIsWalletModalOpen(true)}
        accountAddress={accountData?.address}
        networkName={networkData?.chain?.name}
        onSignIn={signIn}
        isAuthenticated={auth.isAuthenticated}
        isAuthenticating={auth.isAuthenticating}
      >
        {children}
      </TopBarView>
      <WalletOptionsModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  )
}
