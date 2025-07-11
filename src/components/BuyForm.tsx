import React, { useState } from "react";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { parseUnits } from "viem";
import { crowdsaleAbi, crowdsaleAddress, paymentTokenAbi, paymentTokenAddress } from "../hooks/contracts";

export default function BuyForm() {
  const [amount, setAmount] = useState("");
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { data: allowance } = useReadContract({
    abi: paymentTokenAbi as any,
    address: paymentTokenAddress as any,
    functionName: "allowance",
    args: [address || "0x0000000000000000000000000000000000000000", crowdsaleAddress],
  });

  async function handleBuy() {
    if (!amount) return;
    const amt = parseUnits(amount, 18);
    if (!allowance || allowance < amt) {
      await writeContractAsync({
        abi: paymentTokenAbi as any,
        address: paymentTokenAddress as any,
        functionName: "approve",
        args: [crowdsaleAddress, amt],
      });
    }
    await writeContractAsync({
      abi: crowdsaleAbi as any,
      address: crowdsaleAddress as any,
      functionName: "buy",
      args: [amt],
    });
    setAmount("");
  }

  return (
    <div className="bg-white shadow rounded-2xl p-4 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">Buy Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full rounded mb-2"
        placeholder="Amount to spend"
      />
      <button onClick={handleBuy} className="px-4 py-2 rounded bg-blue-600 text-white">Buy</button>
    </div>
  );
}