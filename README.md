# TokenPresaleApp

A simple dApp for managing a **token presale**.  
Built with **Solidity smart contracts** + **React (Vite)** frontend.

---

## Features
- **ERC-20 Token**
  - Configurable name, symbol, supply, decimals.
- **Presale Contract**
  - Accepts ETH contributions.
  - Fixed rate token allocation.
  - Tracks sold tokens & caps.
  - Owner can withdraw ETH after presale.
  - Optional burn of unsold tokens.
- **Frontend**
  - Wallet connect (MetaMask / WalletConnect).
  - Show presale status: price, progress, remaining supply.
  - Buy tokens with ETH via a simple UI.
  - Mobile-friendly.

---

## Install Guide

```bash
# Clone repo
git clone https://github.com/Santos945/TokenPresale-dApp.git
cd TokenPresale-dApp

# Install dependencies
npm install

# Run development
npm start

# Build for production
npm run build

```

Frontend: `http://localhost:5173/`