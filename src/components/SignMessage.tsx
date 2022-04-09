import { verifyMessage } from 'ethers/lib/utils'
import { useSignMessage } from 'wagmi'
import * as React from 'react'

export const SignMessage = () => {
  const previousMessage = React.useRef<string>()
  const [message, setMessage] = React.useState('')
  const [{ data, error, loading }, signMessage] = useSignMessage()

  const recoveredAddress = React.useMemo(() => {
    if (!data || !previousMessage.current) return undefined
    return verifyMessage(previousMessage.current, data)
  }, [data, previousMessage])

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        previousMessage.current = message
        signMessage({ message })
      }}
    >
      <label htmlFor='message'>Enter a message to sign</label>
      <textarea
        id='message'
        placeholder='The quick brown fox…'
        onChange={event => setMessage(event.target.value)}
      />
      <button disabled={loading || !message.length}>
        {loading ? 'Check Wallet' : 'Sign Message'}
      </button>

      {data && (
        <div>
          <div>Recovered Address: {recoveredAddress}</div>
          <div>Signature: {data}</div>
        </div>
      )}
      {error && <div>{error?.message ?? 'Error signing message'}</div>}
    </form>
  )
}
