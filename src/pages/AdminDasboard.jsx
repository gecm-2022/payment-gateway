import React, { useState, useEffect } from "react";
import { useAuth } from "../context/contextapi";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { token, url } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("recharge");
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [loading, setLoading] = useState(true);

  // Fetch transactions based on selected type and status using fetch API
  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `${url}/getAllTransactions?type=${selectedOption}&status=${selectedStatus}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setTransactions(data.transactions);
      } else {
        console.error("Error fetching transactions:", data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchTransactions on component mount and when `selectedOption` or `selectedStatus` changes
  useEffect(() => {
    setLoading(true);
    fetchTransactions();
  }, [selectedOption, selectedStatus]);

  // Handle confirm action
  const handleConfirm = async (transactionId) => {
    const confirmMessage = "Are you sure you want to confirm this transaction?";

    if (window.confirm(confirmMessage)) {
      try {
        const response = await fetch(
          `${url}/confirmTransaction/${transactionId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        if (response.ok) {
          fetchTransactions(); // Refresh transactions after action
          toast.success("Transaction confirmed successfully!");
        } else {
          const data = await response.json();
          toast.error(`Error confirming transaction: ${data.message}`);
          console.error("Error confirming transaction:", data.message);
        }
      } catch (error) {
        toast.error("Error confirming transaction.");
        console.error("Error confirming transaction:", error);
      }
    }
  };

  // Handle decline action
  const handleDecline = async (transactionId) => {
    const declineMessage = "Are you sure you want to decline this transaction?";

    if (window.confirm(declineMessage)) {
      try {
        const response = await fetch(
          `${url}/declineTransaction/${transactionId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        if (response.ok) {
          fetchTransactions(); // Refresh transactions after action
          toast.success("Transaction declined successfully!");
        } else {
          const data = await response.json();
          toast.error(`Error declining transaction: ${data.message}`);
          console.error("Error declining transaction:", data.message);
        }
      } catch (error) {
        toast.error("Error declining transaction.");
        console.error("Error declining transaction:", error);
      }
    }
  };

  return (
    <div className="flex m-auto">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Transaction Status</h2>
        <ul>
          <li>
            <button
              onClick={() => setSelectedStatus("pending")}
              className={`block w-full text-left px-4 py-2 rounded-lg ${selectedStatus === "pending" ? "bg-gray-700" : ""}`}
            >
              Pending
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedStatus("completed")}
              className={`block w-full text-left px-4 py-2 rounded-lg ${selectedStatus === "completed" ? "bg-gray-700" : ""}`}
            >
              Completed
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedStatus("failed")}
              className={`block w-full text-left px-4 py-2 rounded-lg ${selectedStatus === "failed" ? "bg-gray-700" : ""}`}
            >
              Failed
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Option Selection */}
        <div className="mb-4">
          <label className="mr-6">
            <input
              type="radio"
              name="option"
              value="recharge"
              checked={selectedOption === "recharge"}
              onChange={() => setSelectedOption("recharge")}
              className="mr-2"
            />
            Recharges
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="withdrawal"
              checked={selectedOption === "withdrawal"}
              onChange={() => setSelectedOption("withdrawal")}
              className="mr-2"
            />
            Withdrawals
          </label>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div>Loading transactions...</div>
        ) : (
          <div className="overflow-auto max-h-96">
            <table className="min-w-full bg-white border rounded-lg shadow-md">
              <thead className="sticky top-0 bg-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    {selectedOption === "recharge" ? "Ref ID" : "UPI ID"}
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    User Name
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item._id} className="border-b last:border-none">
                    <td className="py-3 px-4">
                      {selectedOption === "recharge" ? item.refId : item.upiId}
                    </td>
                    <td className="py-3 px-4">{item.userId?.username || "Unknown"}</td>
                    <td className="py-3 px-4">${item.amount}</td>
                    <td className="py-3 px-4">{item.status}</td>
                    <td className="py-3 px-4">
                      {item.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleConfirm(item._id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 border-2 border-green-700 hover:bg-green-600 transition"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleDecline(item._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg border-2 border-red-700 hover:bg-red-600 transition"
                          >
                            Decline
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
