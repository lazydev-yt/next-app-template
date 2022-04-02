import { useAction } from 'lib/stories'
import { TopBarView } from './TopBarView'

export const Connected = () => {
  const action = useAction()

  return (
    <TopBarView
      logo='Web3App'
      colorMode='light'
      onDisconnect={action('onDisconnect')}
      onOpenWalletConnect={action('onOpenWalletConnect')}
      toggleColorMode={action('toggleColorMode')}
      accountAddress={'0x109090930290323'}
      networkName={'mainnet'}
    />
  )
}

export const NotConnected = () => {
  const action = useAction()

  return (
    <TopBarView
      logo='Web3App'
      colorMode='light'
      onDisconnect={action('onDisconnect')}
      onOpenWalletConnect={action('onOpenWalletConnect')}
      toggleColorMode={action('toggleColorMode')}
    />
  )
}
