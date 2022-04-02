import { WalletLogo } from './WalletLogo'
import type { Story } from '@ladle/react'

export const Logo: Story<{
  logo: 'walletConnect' | 'injected' | 'walletLink' | string
}> = ({ logo }) => <WalletLogo logo={logo} />

Logo.args = {
  logo: 'injected',
}
Logo.argTypes = {
  logo: {
    options: ['injected', 'walletConnect', 'walletLink'],
    control: { type: 'radio' },
    defaultValue: 'injected',
  },
}
