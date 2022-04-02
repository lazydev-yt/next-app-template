import {
  Box,
  Button,
  Container,
  IconButton,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react'
import * as React from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { WalletOptionsModal } from 'components/WalletOptionsModal'
import * as ga from 'lib/ga'
import { TopBarView } from './TopBarView'

interface TopBarProps {}

export const TopBar: React.FC<TopBarProps> = ({ children }) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = React.useState(false)
  const [{ data: accountData }, disconnect] = useAccount()
  const [{ data: networkData }] = useNetwork()
  const { colorMode, toggleColorMode } = useColorMode()

  const handleDisconnect = () => {
    ga.event({
      action: 'wallet-disconnected',
      params: {},
    })
    disconnect()
  }

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
