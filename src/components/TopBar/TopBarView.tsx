import {
  Box,
  Button,
  ColorMode,
  Container,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import * as React from 'react'
import { WalletIcon } from 'components/icons/WalletIcon'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

interface TopBarViewProps {
  logo?: string | React.ReactNode
  onDisconnect: () => void
  colorMode: ColorMode
  toggleColorMode: () => void
  accountAddress?: string
  networkName?: string
  onOpenWalletConnect: () => void

  isAuthenticated?: boolean
  isAuthenticating?: boolean
  onSignIn?: () => void
}

export const TopBarView: React.FC<TopBarViewProps> = ({
  logo,
  children,
  onDisconnect,
  colorMode,
  toggleColorMode,
  accountAddress,
  networkName,
  onOpenWalletConnect,
  isAuthenticated,
  isAuthenticating,
  onSignIn,
}) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      marginBottom={3}
      padding={2}
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
              <Text variant=''>{logo || ''}</Text>
            </Box>
          </Tooltip>
        </Box>
        <Box position='relative' display='flex' flexDirection='row'>
          {children}
        </Box>

        <Box>
          <IconButton
            variant='ghost'
            aria-label='Mode'
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            scale={0.8}
            onClick={toggleColorMode}
            marginRight={2}
          />
          {accountAddress && networkName ? (
            <>
              <Button size='sm' onClick={onDisconnect}>
                Disconnect {networkName}({accountAddress.substring(0, 6)}...)
              </Button>
              {!isAuthenticated && (
                <Button
                  marginLeft={2}
                  size='sm'
                  onClick={onSignIn}
                  isLoading={isAuthenticating}
                >
                  Sign-In
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                size='sm'
                onClick={onOpenWalletConnect}
                leftIcon={<WalletIcon width={20} height={20} />}
              >
                Connect Wallet
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}
