import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/contextapi";
import { useNavigate } from "react-router-dom";

const WalletWithdraw = () => {
  const { wallet, url, token, user } = useAuth();
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const id = user._id;

  const handleWithdraw = async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (wallet && amount > wallet.balance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      // Request the backend to initiate the withdrawal
      const response = await fetch(`${url}/api/transactions/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ id, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to Paytm payment page for withdrawal
        const form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", data.paytmUrl);

        // Append hidden fields with Paytm parameters
        Object.keys(data.paytmParams).forEach((key) => {
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", data.paytmParams[key]);
          form.appendChild(hiddenField);
        });

        document.body.appendChild(form);
        form.submit(); // Submit the form to Paytm
      } else {
        toast.error(data.error || "Withdrawal initiation failed");
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast.error("Withdrawal failed. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white rounded  m-5 items-center md:w-[100vh] w-auto justify-center">
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
        />
      </div>
      <button
        onClick={handleWithdraw}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Withdraw
      </button>
      {wallet && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">
            Current Balance: ₹{wallet.balance}
          </h3>
        </div>
      )}
    </div>
  );
};

export default WalletWithdraw;
