import * as React from 'react'
import { SVGProps } from 'react'

export const WalletIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox='0 0 32 32'
    xmlns='http://www.w3.org/2000/svg'
    width={32}
    height={32}
    {...props}
  >
    <g data-name='Layer 2' fill='currentColor'>
      <path d='M24 29H8a5 5 0 0 1-5-5V10a1 1 0 0 1 1-1h20a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5ZM5 11v13a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V14a3 3 0 0 0-3-3Z' />
      <path d='M26 11a1 1 0 0 1-1-1V7.25a2.33 2.33 0 0 0-.78-1.87 1.94 1.94 0 0 0-1.67-.32L5.78 8.87a1 1 0 0 0-.78 1 1 1 0 0 1-2 0 3 3 0 0 1 2.33-2.95l16.78-3.81a3.9 3.9 0 0 1 3.36.71A4.34 4.34 0 0 1 27 7.25V10a1 1 0 0 1-1 1ZM28 23h-7a4 4 0 0 1 0-8h7a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1Zm-7-6a2 2 0 0 0 0 4h6v-4Z' />
    </g>
    <path
      style={{
        fill: 'none',
      }}
      d='M0 0h32v32H0z'
    />
  </svg>
)
