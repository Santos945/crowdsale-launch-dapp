# 🪙 TokenSale DApp

A decentralized application (dApp) for participating in a **token crowdsale**.  
Users can connect their crypto wallets, purchase tokens, and claim refunds if the sale does not meet its goal.  

Built with:
- **Solidity** smart contracts (ERC20 token + crowdsale logic)  
- **Hardhat** for development, deployment, and testing  
- **React + Vite + TailwindCSS** for the frontend  
- **wagmi + viem + RainbowKit** for wallet connectivity  

---

## ✨ Features

### 👥 For Users
- **Connect your wallet** (MetaMask, WalletConnect, Coinbase Wallet, etc.)  
- **Buy tokens** directly with the supported payment token (e.g., USDC)  
- **Check sale progress** – see how much has been raised so far  
- **Claim refund** automatically if the crowdsale is unsuccessful  

### 🛠 For Developers
- Fully **audited-style** Solidity contracts using OpenZeppelin  
- **Hardhat environment** with deployment scripts and tests  
- **Typechain bindings** for contract interaction  
- **Modern frontend stack** (React 18, wagmi, RainbowKit, Tailwind)  
- **Environment-driven config** (no hardcoding contract addresses)  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/chainhub1227/crowdsale-launch-dapp.git
cd tokensale-dapp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Copy the example environment file:
```bash
cp .env.example .env
```

Fill in your deployed addresses:
```env
VITE_CROWDSALE_ADDRESS=0xYourCrowdsaleAddress
VITE_PAYMENT_TOKEN_ADDRESS=0xYourPaymentTokenAddress
```

### 4. Start the frontend
```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173).

---

## 💻 Developer Guide

### Compile and test contracts
```bash
npx hardhat compile
npx hardhat test
```

### Deploy to a testnet
Edit `hardhat.config.ts` with your RPC + private key, then:
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

Update `.env` with deployed addresses.

### Build frontend for production
```bash
npm run build
```
This generates a production-ready bundle in `dist/`.

---

## 📂 Project Structure

```
contracts/        # Solidity smart contracts
scripts/          # Deployment scripts
test/             # Smart contract tests
frontend/ or src/ # React frontend
  components/     # UI components (SaleStatus, BuyForm, RefundButton)
  hooks/          # Contract ABIs and addresses
  App.tsx         # Main app wrapper
```

---

## 📱 How Users Interact

1. **Connect Wallet**  
   Click the "Connect Wallet" button powered by RainbowKit.  

2. **Check Sale Status**  
   The **Sale Status** card displays how much has been raised.  

3. **Buy Tokens**  
   Enter an amount and click **Buy**.  
   - If needed, the app first asks for token **approval**.  
   - Then it calls the **buy()** function on the crowdsale contract.  

4. **Refund (if sale fails)**  
   If the funding goal is not reached, click **Claim Refund** to get your payment back.  

---

## 🔐 Security Notes
- Contracts use OpenZeppelin libraries (`ERC20`, `Ownable`, `ReentrancyGuard`).  
- Safe math and pull-based refunds prevent common exploits.  
- Always test on a **testnet** (Sepolia/Goerli) before mainnet.  

---

## 🛡 License
This project is licensed under the **MIT License**.  
