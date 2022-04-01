import { Box, Button, Container, Text, Tooltip } from '@chakra-ui/react'
import * as React from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { WalletOptionsModal } from 'components/WalletOptionsModal'
import * as ga from 'lib/ga'
import { WalletIcon } from 'components/icons/WalletIcon'

interface TopBarProps {}

export const TopBar: React.FC<TopBarProps> = ({ children }) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = React.useState(false)
  const [{ data: accountData }, disconnect] = useAccount()
  const [{ data: networkData }] = useNetwork()

  const handleDisconnect = () => {
    ga.event({
      action: 'wallet-disconnected',
      params: {},
    })
    disconnect()
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      marginBottom={3}
      position='fixed'
      padding={2}
      top={0}
      left={0}
      right={0}
    >
      <Container
        maxWidth='container.lg'
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        height='60px'
      >
        <Box>
          <Tooltip label='Hover me'>
            <Box>
              <Text variant=''>Web3App</Text>
            </Box>
          </Tooltip>
        </Box>
        <Box position='relative' display='flex' flexDirection='row'>
          {children}
        </Box>

        <Box>
          {accountData ? (
            <Button size='sm' onClick={handleDisconnect}>
              Disconnect {networkData.chain.name}(
              {accountData.address.substring(0, 6)}...)
            </Button>
          ) : (
            <Button
              size='sm'
              onClick={() => setIsWalletModalOpen(true)}
              leftIcon={<WalletIcon width={20} height={20} />}
            >
              Connect Wallet
            </Button>
          )}
        </Box>
      </Container>
      <WalletOptionsModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </Box>
  )
}
