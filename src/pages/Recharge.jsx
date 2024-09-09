import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/contextapi";
import { useNavigate } from "react-router-dom";

const WalletRecharge = () => {
  const { wallet, url, token, user, createTransaction } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false); // State for loader
  const [upiInitiated, setUpiInitiated] = useState(false); // Track if UPI has been initiated
  const navigate = useNavigate();
  const userId = user._id;
  const type = "recharge";

  const handleRecharge = async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true); // Start the loader

    try {
      // Create the transaction first
      const transactionId = await createTransaction(userId, type, amount);
      setAmount("");
     
      // console.log(transactionId)

      // Simulate redirection to UPI payment (handled by external app)
      const upiLink = `upi://pay?pa=9099616557@yapl&pn=Harsh%20prajapati&cu=INR&am=${amount}&tn=`;
      setUpiInitiated(true);
      window.location.href = upiLink;

      // After a certain time (assume the user has come back from UPI app), redirect to confirm-payment
      setTimeout(() => {
        setUpiInitiated(false);
        navigate(`/confirm-payment/${transactionId}`);
      }, 1000); // Adjust this time (10 seconds here) based on your UPI flow
    } catch (error) {
      console.error("Error recharging wallet:", error);
      toast.error("Failed to recharge");
    } finally {
      setLoading(false); // Stop the loader after the process
    }
  };

  return (
    <div className="p-4 bg-white m-auto rounded my-1 items-center md:w-[100vh] w-auto justify-center">
      <h2 className="text-xl font-semibold mb-4">Recharge Wallet</h2>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700">
          Enter Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          placeholder="Enter amount to recharge"
        />
      </div>
      <button
        onClick={handleRecharge}
        className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading} // Disable button during loading
      >
        {loading ? "Processing..." : upiInitiated ? "Waiting for UPI..." : "Recharge Now"}
      </button>
      {/* {wallet && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">
            Current Balance: ₹{wallet.balance}
          </h3>
        </div>
      )} */}
    </div>
  );
};

export default WalletRecharge;
