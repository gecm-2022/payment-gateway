import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/contextapi";
import { useNavigate } from "react-router-dom";

const WalletWithdraw = () => {
  const { wallet, url, token, user, createTransaction } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false); // State for loader
  const [withdrawInitiated, setWithdrawInitiated] = useState(false); // Track if withdrawal has been initiated
  const navigate = useNavigate();
  const userId = user._id;
  const type = "withdrawal"; // Transaction type is withdrawal

  const handleWithdraw = async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Ensure the user has enough balance to withdraw
    if (amount > wallet.balance) {
      toast.error("Insufficient balance");
      return;
    }

    setLoading(true); // Start the loader

    try {
      // Create the transaction for withdrawal
      const transactionId = await createTransaction(userId, type, amount);
      setAmount("");

      setWithdrawInitiated(true);

      // Simulate processing withdrawal, you could add actual processing logic here
      setTimeout(() => {
        setWithdrawInitiated(false);
        navigate(`/confirm-withdrawal/${transactionId}`);
      }, 1000); // Adjust time as needed
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      toast.error("Failed to withdraw");
    } finally {
      setLoading(false); // Stop the loader after the process
    }
  };

  return (
    <div className="p-4 bg-white m-auto rounded my-1 items-center md:w-[100vh] w-auto justify-center">
      <h2 className="text-xl font-semibold mb-4">Withdraw from Wallet</h2>
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
          placeholder="Enter amount to withdraw"
          disabled={loading} 
        />
      </div>
      <button
        onClick={handleWithdraw}
        className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading} // Disable button during loading
      >
        {loading ? "Processing..." : withdrawInitiated ? "Processing Withdrawal..." : "Withdraw Now"}
      </button>
    </div>
  );
};

export default WalletWithdraw;
