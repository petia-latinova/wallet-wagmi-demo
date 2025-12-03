import { Card, CardContent, Stack, Button, Divider, Alert, Typography } from '@mui/material';
import { useConnect, useConnectors } from 'wagmi';

export default function ConnectWalletCard() {
  const { connect, status, error } = useConnect();
  const connectors = useConnectors();

  const getStatusSeverity = (status: string) =>
    status === 'error' || status === 'success' ? status : 'info';

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Connect Wallet</Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
          {connectors.map(connector => (
            <Button
              key={connector.uid}
              variant="contained"
              color="primary"
              sx={{ flex: 1 }}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </Button>
          ))}
        </Stack>

        <Divider sx={{ my: 1 }} />

        {!error && status && <Alert severity={getStatusSeverity(status)} sx={{ mt: 1 }}>{status}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 1 }}>{error.message}</Alert>}
      </CardContent>
    </Card>
  );
}
