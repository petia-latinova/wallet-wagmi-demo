import { Card, CardContent, Stack, Button, CircularProgress, Typography } from '@mui/material';
import { useBalance, useConnection } from 'wagmi';
import { formatEther } from 'viem';
import InfoItem from './InfoItem';
import { useBalanceAutoRefetch } from '../hooks/useBalanceAutoRefetch';

interface WalletConnectionCardProps {
  connection: ReturnType<typeof useConnection>;
  address?: `0x${string}`,
  disconnect: () => void;
}

export default function WalletConnectionCard({ connection, disconnect, address }: WalletConnectionCardProps) {
  const { data: balance, isLoading, refetch } = useBalance({ address });

  useBalanceAutoRefetch(refetch);

  const formattedBalance = balance
    ? {
        ...balance,
        formatted: Number(formatEther(balance.value)).toFixed(4),
      }
    : undefined;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Connection</Typography>
        <Stack spacing={1}>
          <InfoItem label="Status" value={connection.status} />
          <InfoItem label="Network" value={connection.chain?.name} />
          <InfoItem label="ChainId" value={connection.chainId} />
          <InfoItem label="Address" value={JSON.stringify(connection.addresses?.[0])} />
          <InfoItem
            label="Balance"
            value={isLoading ? <CircularProgress size={14} /> : formattedBalance ? `${formattedBalance.formatted} ${formattedBalance.symbol}` : 'Not connected'}
          />
        </Stack>

        {connection.status === 'connected' && (
          <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => disconnect()}>
            Disconnect
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
