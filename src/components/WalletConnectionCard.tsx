import { Card, CardContent, Stack, Button, CircularProgress, Typography } from '@mui/material';
import { useConnection, useDisconnect, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import InfoItem from './InfoItem';

export default function WalletConnectionCard() {
  const connection = useConnection();
  const { disconnect } = useDisconnect();
  const address = connection.addresses?.[0];

  const { data: balance, isLoading } = useBalance({ address });

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
            value={isLoading ? <CircularProgress size={14} /> : balance ? `${formatEther(balance.value)} ${balance.symbol}` : 'Not connected'}
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
