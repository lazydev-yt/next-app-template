import * as React from 'react'
import { MetamaskIcon } from 'components/icons/MetamaskIcon'
import { WalletConnectIcon } from 'components/icons/WalletConnectIcon'
import { WalletLinkIcon } from 'components/icons/WalletLinkIcon'

interface WalletLogoProps {
  logo: string
}

export const WalletLogo: React.FC<WalletLogoProps> = ({ logo }) => {
  if (logo === 'walletConnect') {
    return <WalletConnectIcon width={32} height={32} />
  }

  if (logo === 'walletLink') {
    return <WalletLinkIcon width={24} height={24} />
  }

  if (logo === 'injected') {
    return <MetamaskIcon width={32} height={32} />
  }

  return null
}
