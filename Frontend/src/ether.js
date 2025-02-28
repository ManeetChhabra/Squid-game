import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

const handlePayment = async () => {
  const { config } = usePrepareSendTransaction({
    to: '0xYourWalletAddress',
    value: parseEther('0.01'), // Set price in ETH
  });

  const { sendTransaction } = useSendTransaction(config);
  sendTransaction?.();
};

<button onClick={handlePayment} className="bg-green-500 text-white p-3 rounded-lg">
  Pay with Crypto
</button>;
