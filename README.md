# Wallet Wagmi Demo

A simple and clean demo application showcasing **wallet connection**, **balance fetching**, and **USDC token transfers** using:

- **React + Vite**
- **TypeScript**
- **wagmi v3**
- **viem**
- **Material UI (MUI)**

This project demonstrates how to:

- Connect and disconnect an Ethereum wallet
- Display the connected wallet's address, network, and native balance
- Read USDC token balance from an ERC-20 contract
- Send USDC tokens to another address
- Automatically refresh balances using a custom `useBalanceAutoRefetch` hook

---

## Features

### Wallet Connection
- Connect/disconnect using the **injected connector** (MetaMask / Browser wallets)
- Displays:
  - Connection status  
  - Network name  
  - Chain ID  
  - Wallet address  
  - Real-time native balance

### USDC Token Panel
- Fetches and displays testnet USDC balance
- Allows sending USDC to another address
- Validates:
  - recipient format
  - amount value
  - sufficient balance

### Auto Balance Refresh
A custom hook:  
**useBalanceAutoRefetch(refetch)**

Automatically refreshes wallet and USDC balances on:
- every new block  
- wallet address change  
- network change  
- initial connection  

No manual reloading needed.

---

## Tech Stack

| Library | Usage |
|--------|-------|
| **React + TypeScript** | UI + App structure |
| **Vite** | Fast development environment |
| **wagmi v3** | Wallet connection + blockchain calls |
| **viem** | Contract ABIs, encoding, transaction formatting |
| **Material UI** | Visual design and components |
| **React Query (built into wagmi)** | Data caching and fetching |

---

## Project Structure

```
src/
components/
ConnectWalletCard.tsx
WalletConnectionCard.tsx
UsdcCard.tsx
InfoItem.tsx
hooks/
useBalanceAutoRefetch.ts
contracts/
usdc.ts # ABI + USDC contract config
App.tsx
main.tsx
```
---

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Requirements
- Node.js 18+

- Browser wallet (MetaMask, Brave Wallet, etc.)

- Connected blockchain must match USDC contract network (testnet)

## How It Works
### 1. Connecting a Wallet 
ConnectWalletCard uses: 

```typescript
const { status, error, connect } = useConnect();
const connection = useConnection();
```
Clicking Connect Wallet opens the injected wallet prompt. 

### 2. Displaying Wallet Info

WalletConnectionCard shows:

- connection.status
- chain.name
- chainId
- address
- formatted native balance

Using:

```typescript
const { data: balance, refetch } = useBalance({ address })
useBalanceAutoRefetch(refetch)
```
This ensures the balance updates on every block. 

## 3. Reading and Sending USDC

### UsdcCard uses:

```typescript
useReadContract({ ...usdcContract, functionName: 'balanceOf' })
useWriteContract()
```

The **Send USDC** button is automatically disabled when:

- the wallet is not connected

- a transaction is currently pending

## Custom Hook: Auto Balance Refresh

Located at: `src/hooks/useBalanceAutoRefetch.ts`

```typescript
useEffect(() => {
  if (blockNumber !== undefined) refetch();
}, [blockNumber]);

useEffect(() => {
  if (status === 'connected' && address) refetch();
}, [address, chainId, status]);
```

This hook keeps both native and USDC balances fresh without manual reloading. 

## License  

MIT — free for personal and commercial use.

## Credits

Built as part of a learning/demo project for experimenting with wagmi, viem, and Web3 wallet UX patterns.