import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/contextapi";
import { useNavigate, useParams } from "react-router-dom";

const UpiPaymentPage = () => {
  const { updateTransactionUpiId } = useAuth(); // Removed validateUpiId
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { transactionId } = useParams(); // Using URL params to get the transaction ID

  // Handle UPI submit
  const handleSubmit = async () => {
    if (!upiId) {
      toast.error("Please enter your UPI ID");
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Directly updating transaction with the UPI ID, no validation
      const data = await updateTransactionUpiId(transactionId, upiId);

      if (data && data.success) {
        toast.success("UPI payment request submitted successfully");
        navigate("/account");
      } else {
        toast.error("Failed to submit UPI ID");
      }
    } catch (error) {
      console.error("Error submitting UPI ID:", error);
      toast.error("Error submitting UPI ID");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="m-auto rounded my-4 items-center md:w-[100vh] p-4 w-full justify-center">
      <h2 className="text-2xl text-left font-semibold mb-4">Enter UPI ID for Payment</h2>
      <div className="mb-4">
        <label htmlFor="upiId" className="block text-gray-700">
          Enter Your UPI ID:
        </label>
        <input
          type="text"
          id="upiId"
          value={upiId}
          autoFocus
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded mt-1"
          placeholder="example@upi"
        />
        <h2 className="text-sm text-gray-500">
          Please ensure your UPI ID is correct before submitting.
        </h2>
      </div>
      <button
        onClick={handleSubmit}
        className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading} // Disable button during loading
      >
        {loading ? "Submitting..." : "Submit UPI"}
      </button>
    </div>
  );
};

export default UpiPaymentPage;
