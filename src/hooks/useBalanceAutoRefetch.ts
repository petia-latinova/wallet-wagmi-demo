import { useEffect } from 'react'
import { useConnection, useBlockNumber } from 'wagmi'

export function useBalanceAutoRefetch(refetch: () => void) {
  const { address, chainId, status } = useConnection()
  const { data: blockNumber } = useBlockNumber({ watch: true })

  useEffect(() => {
    if (blockNumber !== undefined) {
      refetch()
    }
  }, [blockNumber, refetch])

  useEffect(() => {
    if (status === 'connected' && address) {
      refetch()
    }
  }, [address, chainId, status, refetch])
}
