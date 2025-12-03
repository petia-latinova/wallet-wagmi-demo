import {
  useBalance,
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
} from 'wagmi';
import { formatEther } from 'viem';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';

function App() {
  const connection = useConnection();
  const { connect, status, error } = useConnect();
  const connectors = useConnectors();
  const { disconnect } = useDisconnect();
  const address = connection.addresses?.[0]; // primary address

  const { data: balance, isLoading } = useBalance({ address });

  // const getStatusSeverity = (status: string) =>
  //   status === 'error' ? 'error' : status === 'success' ? 'success' : 'info';

  const getStatusSeverity = (status: string) =>
  status === 'error' || status === 'success' ? status : 'info';

  const InfoItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Typography>
      <Typography component="span" fontWeight="bold">
        {label}:
      </Typography>{' '}
      {value}
    </Typography>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Wagmi Demo
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Connection
          </Typography>

          <Stack spacing={1}>
            <InfoItem label="Status" value={connection.status} />
            <InfoItem label="Addresses" value={JSON.stringify(connection.addresses)} />
            <InfoItem label="ChainId" value={connection.chainId} />
            <InfoItem
              label="Balance"
              value={
                isLoading ? <CircularProgress size={14} /> : balance ? `${formatEther(balance.value)} ${balance.symbol}` : 'Not connected'
              }
            />
          </Stack>

          {connection.status === 'connected' && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Connect Wallet
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
            {connectors.map((connector) => (
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

          {!error && status && (
            <Alert severity={getStatusSeverity(status)} sx={{ mt: 1 }}>
              {status}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error.message}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
