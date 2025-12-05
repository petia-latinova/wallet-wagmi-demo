import { Card, CardContent, Stack, Button, Typography, Divider, Alert } from '@mui/material';

interface ConnectWalletCardProps {
  status: 'idle' | 'pending' | 'error' | 'success';
  error: Error | null;
  connect: () => void;
}

export default function ConnectWalletCard({ status, error, connect }: ConnectWalletCardProps) {
  const getStatusSeverity = (status: string) =>
    status === 'error' || status === 'success' ? status : 'info';

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Connect Wallet
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button variant="contained" sx={{ flex: 1 }} onClick={connect}>
            Connect Wallet
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {!error && status && <Alert severity={getStatusSeverity(status)}>{status}</Alert>}
        {error && <Alert severity="error">{error.message}</Alert>}
      </CardContent>
    </Card>
  );
}
