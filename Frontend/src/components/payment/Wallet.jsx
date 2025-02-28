import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, Loader2 } from "lucide-react";
import QRCode from "react-qr-code";

export default function Wallet() {
  const [isPaid, setIsPaid] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-orange-50 p-6 space-y-6 md:space-x-6 md:space-y-0">
      {/* UPI Payment */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-orange-200 flex flex-col justify-between h-[550px]">
        <h2 className="text-2xl font-semibold text-orange-600">UPI Payment</h2>
        <p className="text-gray-600">Pay securely using UPI</p>
        <div className="bg-orange-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-700 text-sm">Pay to:</p>
          <h3 className="text-lg font-semibold text-orange-600">merchant@upi</h3>
        </div>
        <div className="text-xl font-bold text-gray-800">₹ 499.00</div>
        <div className="flex justify-center bg-white p-4 rounded-lg shadow-sm">
          <QRCode value="upi://pay?pa=merchant@upi&pn=Merchant&am=499" size={140} />
        </div>
        <button
          onClick={() => setIsPaid(true)}
          className="w-full bg-orange-500 text-white py-3 rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-orange-600 transition-all ease-in-out duration-300 shadow-md"
        >
          {isPaid ? <CheckCircle className="mr-2" /> : <ChevronRight className="mr-2" />} 
          {isPaid ? "Payment Successful" : "Pay Now"}
        </button>
      </div>
      
      {/* Blockchain Payment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-2xl shadow-xl bg-white border border-orange-200 text-orange-600 w-full max-w-md flex flex-col justify-between h-[550px]"
      >
        <h2 className="text-center text-2xl font-bold">Blockchain Payment</h2>
        <div className="bg-orange-100 border border-orange-200 text-center p-4 rounded-lg">
          <ConnectButton/>
        </div>
        {isConnected && address && (
          <div className="flex flex-col items-center bg-orange-100 p-4 rounded-lg shadow-md">
            <p className="text-gray-700 text-sm">Wallet Address:</p>
            <h3 className="text-xs break-all font-semibold text-orange-600">{address}</h3>
            <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
              <QRCode value={address} size={140} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
