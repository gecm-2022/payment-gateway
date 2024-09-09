import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/contextapi";
import { useNavigate, useParams } from "react-router-dom";

const PaymentPage = () => {
  const { updateTransactionRefId } = useAuth();
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { transactionId } = useParams(); // Using URL params to get the transaction ID

  const handleSubmit = async () => {
    if (!refId) {
      toast.error("Please enter the reference ID");
      return;
    }
  
    setLoading(true); // Start loading state
  
    try {
      // console.log(transactionId)
      const data = await updateTransactionRefId(transactionId, refId);

  
      if (data && data.success) {
        toast.success("Recharge request submitted successfully");
        navigate("/account");
      } else {
        toast.error("Failed to submit reference ID");
      }
    } catch (error) {
      console.error("Error submitting refId:", error);
      toast.error("Error submitting reference ID");
    } finally {
      setLoading(false); // Stop loading state
    }
  };
  

  return (
    <div className="m-auto rounded my-4 items-center md:w-[100vh]  p-4 w-full justify-center">
      <h2 className="text-2xl text-left font-semibold mb-4">Confirm Payment</h2>
      <div className="mb-4">
        <label htmlFor="refId" className="block text-gray-700">
          Enter Payment Reference ID:
        </label>
        <input
          type="text"
          id="refId"
          value={refId}
          autoFocus
          onChange={(e) => setRefId(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded mt-1"
          placeholder="Input 12-Digit here"
        />
        <h2 className="text-sm text-gray-500">
          Generally, your transfer will be confirmed within 10 minutes.
        </h2>
      </div>
      <button
        onClick={handleSubmit}
        className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading} // Disable button during loading
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default PaymentPage;
