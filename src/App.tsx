import { Container, Typography } from '@mui/material';
import WalletConnectionCard from './components/WalletConnectionCard';
import ConnectWalletCard from './components/ConnectWalletCard';
import UsdcCard from './components/UsdcCard';
import { useConnection, useConnect, useDisconnect } from 'wagmi';
import { injected } from '@wagmi/connectors';

function App() {
  const connection = useConnection();
  const { status, error, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const address = connection.addresses?.[0];

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Wagmi Demo
      </Typography>

      {connection.status !== 'connected' && (
        <ConnectWalletCard status={status} error={error} connect={handleConnect} />
      )}

      <WalletConnectionCard connection={connection} address={address} disconnect={disconnect} />

      <UsdcCard address={address} />
    </Container>
  );
}

export default App;
