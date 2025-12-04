import { Card, CardContent, Stack, Button, CircularProgress, Typography } from '@mui/material';
import { useConnection } from 'wagmi';
import { formatEther } from 'viem';
import InfoItem from './InfoItem';

interface WalletConnectionCardProps {
  connection: ReturnType<typeof useConnection>;
  balance?: { decimals: number; symbol: string; value: bigint };
  isLoading: boolean;
  disconnect: () => void;
}

export default function WalletConnectionCard({ connection, balance, isLoading, disconnect }: WalletConnectionCardProps) {
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
          <InfoItem label="Addresses" value={JSON.stringify(connection.addresses)} />
          <InfoItem label="ChainId" value={connection.chainId} />
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
