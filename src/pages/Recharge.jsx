import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/contextapi";
import { useNavigate } from "react-router-dom";

const WalletRecharge = () => {
  const { wallet, url, token, user } = useAuth();
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const userId = user._id;

  const handleRecharge = async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      // Request the backend to initiate the payment and get the transaction parameters
      const response = await fetch(`${url}/api/transactions/recharge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ userId, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to Paytm payment page
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
        toast.error(data.error || "Recharge initiation failed");
      }
    } catch (error) {
      console.error("Recharge error:", error);
      toast.error("Recharge failed. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white rounded m-5 items-center md:w-[100vh] w-auto justify-center">
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
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Recharge
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

export default WalletRecharge;
