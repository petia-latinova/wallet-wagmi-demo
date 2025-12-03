import { Container, Typography, Card, CardContent } from '@mui/material';
import WalletConnectionCard from './components/WalletConnectionCard';
import ConnectWalletCard from './components/ConnectWalletCard';
import UsdcPanel from './components/UsdcPanel';
import { useConnection } from 'wagmi';

function App() {
  const { addresses } = useConnection();
  const address = addresses?.[0];

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Wagmi Demo</Typography>

      <WalletConnectionCard />
      <ConnectWalletCard />

      {address && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <UsdcPanel address={address} />
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default App;
