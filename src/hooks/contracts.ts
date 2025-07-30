export const crowdsaleAddress = process.env.VITE_CROWDSALE_ADDRESS || "0xYourCrowdsaleAddressHere";
export const paymentTokenAddress = process.env.VITE_PAYMENT_TOKEN_ADDRESS || "0xYourPaymentTokenAddressHere";

export const crowdsaleAbi = [
  {"inputs":[{"internalType":"uint256","name":"paymentAmount","type":"uint256"}],"name":"buy","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"refund","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"raised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
];

export const paymentTokenAbi = [
  {"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
];