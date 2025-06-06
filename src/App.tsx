import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {"mainnet","sepolia"} from "wagmi/chains";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { http } from "viem";

import SaleStatus from "./components/SaleStatus";
import BuyForm from "./components/BuyForm";
import RefundButton from "./components/RefundButton";

const projectId = "demo-project";
const { chains, publicClient } = configureChains([sepolia, mainnet], [http()]);
const { connectors } = getDefaultWallets({ appName: "TokenSale DApp", projectId, chains });
const config = createConfig({ autoConnect: true, connectors, publicClient });

export default function App() {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <div className="min-h-screen flex flex-col items-center gap-6 p-6">
          <h1 className="text-3xl font-bold">Token Sale</h1>
          <SaleStatus />
          <BuyForm />
          <RefundButton />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}