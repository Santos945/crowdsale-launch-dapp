import React from "react";
import { useReadContract } from "wagmi";
import { crowdsaleAbi, crowdsaleAddress } from "../hooks/contracts";

export default function SaleStatus() {
  const { data: raised } = useReadContract({
    abi: crowdsaleAbi as any,
    address: crowdsaleAddress as any,
    functionName: "raised",
  });

  return (
    <div className="bg-white shadow rounded-2xl p-4 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">Sale Status</h2>
      <div className="text-sm text-gray-700">Raised: {String(raised || 0)}</div>
    </div>
  );
}