import { useBalance, useConnect, useConnection, useConnectors, useDisconnect } from 'wagmi'
import { formatEther } from 'viem'

function App() {
  const connection = useConnection()
  const { connect, status, error } = useConnect()
  const connectors = useConnectors()
  const { disconnect } = useDisconnect()
  const address = connection.addresses?.[0] // primary address

  const { data: balance, isLoading } = useBalance({
    address,
  })

  return (
    <>
      <div>
        <h2>Connection</h2>

        <div>
          status: {connection.status}
          <br />
          addresses: {JSON.stringify(connection.addresses)}
          <br />
          chainId: {connection.chainId}
          <br />
          Balance: {isLoading 
              ? "Loading..." 
              : balance 
                ? `${formatEther(balance.value)} ${balance.symbol}`
                : "Not connected"}
        </div>

        {connection.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
