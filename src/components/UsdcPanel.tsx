import { useState } from 'react';
import { TextField, Typography, Button, Stack, Divider, Alert } from '@mui/material';
import { useReadContract, useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { usdcContract, USDC_DECIMALS } from '../contracts/usdc';
import { isAddress } from 'viem';

interface UsdcPanelProps {
  address?: `0x${string}`;
}

export default function UsdcPanel({ address }: UsdcPanelProps) {
  const { data: usdcBalance } = useReadContract({
    ...usdcContract,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { writeContract: sendUsdc, isPending: isSending, isSuccess: sendSuccess } = useWriteContract();

  const handleSendUsdc = () => {
    setErrorMessage('');

    if (!recipient || !amount) {
      setErrorMessage('Recipient and amount are required.');
      return;
    }
    if (!isAddress(recipient)) {
      setErrorMessage('Invalid recipient address.');
      return;
    }

    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setErrorMessage('Amount must be a positive number.');
      return;
    }

    const balanceNum = usdcBalance ? Number(usdcBalance) / 10 ** USDC_DECIMALS : 0;
    if (amountNum > balanceNum) {
      setErrorMessage('Insufficient USDC balance.');
      return;
    }

    sendUsdc({
      ...usdcContract,
      functionName: 'transfer',
      args: [recipient, parseUnits(amount, USDC_DECIMALS)],
    });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        USDC (Testnet)
      </Typography>

      <Stack spacing={1}>
        <Typography>
          <strong>USDC Balance:</strong> {usdcBalance ? Number(usdcBalance) / 10 ** USDC_DECIMALS : '0'}
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1">Send USDC</Typography>

      {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}

      <TextField
        label="Recipient Address"
        fullWidth
        sx={{ mt: 1 }}
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <TextField
        label="Amount (USDC)"
        fullWidth
        sx={{ mt: 2 }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSendUsdc}
        disabled={isSending}
      >
        {isSending ? 'Sending...' : 'Send USDC'}
      </Button>

      {sendSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Transaction sent successfully!
        </Alert>
      )}
    </div>
  );
}
