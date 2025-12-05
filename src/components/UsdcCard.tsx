import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Stack,
  TextField
} from '@mui/material';

import { useReadContract, useWriteContract } from 'wagmi';
import { parseUnits, isAddress } from 'viem';
import { usdcContract, USDC_DECIMALS } from '../contracts/usdc';
import { useBalanceAutoRefetch } from '../hooks/useBalanceAutoRefetch';

interface UsdcCardProps {
  address?: `0x${string}`;
}

export default function UsdcCard({ address }: UsdcCardProps) {
  const { data: usdcBalance, refetch } = useReadContract({
    ...usdcContract,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  useBalanceAutoRefetch(refetch);

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    writeContract: sendUsdc,
    isPending: isSending,
    isSuccess: sendSuccess,
  } = useWriteContract();

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

    const balanceNum =
      usdcBalance ? Number(usdcBalance) / 10 ** USDC_DECIMALS : 0;

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
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          USDC
        </Typography>

        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography>
            <strong>Balance:</strong>{' '}
            {usdcBalance
              ? Number(usdcBalance) / 10 ** USDC_DECIMALS
              : '0'}
          </Typography>
        </Stack>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Send USDC
        </Typography>

        <TextField
          label="Recipient Address"
          fullWidth
          sx={{ mt: 2 }}
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

        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          disabled={isSending}
          onClick={handleSendUsdc}
        >
          {isSending ? 'Sending...' : 'Send USDC'}
        </Button>

        {sendSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Transaction sent successfully!
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
