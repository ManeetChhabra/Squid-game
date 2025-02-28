import { useState } from "react";
import { CheckCircle, ChevronRight } from "lucide-react";
import QRCode from "react-qr-code";

export default function UpiPaymentScreen() {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center">
        <h2 className="text-xl font-semibold text-orange-600">UPI Payment</h2>
        <p className="text-gray-600 mt-1">Pay securely using UPI</p>

        {/* Payment Card */}
        <div className="bg-orange-100 p-4 rounded-lg mt-4 shadow-md">
          <p className="text-gray-700 text-sm">Pay to:</p>
          <h3 className="text-lg font-semibold text-orange-600">merchant@upi</h3>
        </div>

        {/* Amount */}
        <div className="mt-3 text-lg font-bold text-gray-800">₹ 499.00</div>

        {/* QR Code */}
        <div className="flex justify-center mt-4 bg-white p-2 rounded-lg shadow-sm">
          <QRCode value="upi://pay?pa=merchant@upi&pn=Merchant&am=499" size={120} />
        </div>

        {/* Pay Button */}
        <button
          onClick={() => setIsPaid(true)}
          className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg flex items-center justify-center text-lg font-semibold hover:bg-orange-600 transition-all ease-in-out duration-300 shadow-md"
        >
          {isPaid ? <CheckCircle className="mr-2" /> : <ChevronRight className="mr-2" />} 
          {isPaid ? "Payment Successful" : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
