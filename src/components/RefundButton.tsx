import React from "react";
import { useWriteContract } from "wagmi";
import { crowdsaleAbi, crowdsaleAddress } from "../hooks/contracts";

export default function RefundButton() {
  const { writeContractAsync } = useWriteContract();
  async function handleRefund() {
    await writeContractAsync({
      abi: crowdsaleAbi as any,
      address: crowdsaleAddress as any,
      functionName: "refund",
    });
  }
  return (
    <div className="bg-white shadow rounded-2xl p-4 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">Refund</h2>
      <button onClick={handleRefund} className="px-4 py-2 rounded bg-red-600 text-white">Claim Refund</button>
    </div>
  );
}