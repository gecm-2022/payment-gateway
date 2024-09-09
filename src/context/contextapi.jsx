import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext();

export const MycontextProvide = ({ children }) => {
  const url = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState("");
  const [wallet, setWallet] = useState(0);
  const [TotalRecharge, setTotalRecharge] = useState(0);
  const [TotalWithdrawal, setTotalWithdrawal] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const isLogin = !!token;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const Logout = () => {
    setToken("");
    setUser("");
    setUserType("");
    toast.success("Logged out");
    localStorage.removeItem("token");
  };

  const userdata = async () => {
    try {
      const response = await fetch(`${url}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (response.ok) {
        const r = await response.json();
        setUser(r.user);
        setWallet(r.user.wallet ? r.user.wallet.balance : 0);

        const totalRechargeData = r.totalRechargeData;
        if (totalRechargeData.length > 0) {
       
          const { totalRechargeCount } = totalRechargeData[0];

          setTotalRecharge(totalRechargeCount || 0);
        } 
        const totalWithdrawalData = r.totalWithdrawalData;
        if (totalWithdrawalData.length > 0) {
       
          const { totalWithdrawalCount } = totalWithdrawalData[0];

          setTotalWithdrawal(totalWithdrawalCount || 0);
        } 
       
        setUserType(r.user.isAdmin ? "admin" : "user");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const Signup = async (data) => {
    try {
      const r = await fetch(`${url}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await r.json();
      if (r.ok) {
        storeToken(res.authtoken);
        setUserType(res.isAdmin ? "admin" : "user");
        userdata();
        toast.success(res.message);
      } else {
        toast.error(res.error ? res.error : res);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  const Login = async (data) => {
    try {
      const r = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await r.json();
      if (r.ok) {
        storeToken(res.authtoken);
        setUserType(res.isAdmin ? "admin" : "user");
        userdata();
        toast.success(res.message);
      } else {
        toast.error(res.error ? res.error : res);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const getUserTransactions = async () => {
    try {
      const response = await fetch(`${url}/getUserTransactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (response.ok) {
        const r = await response.json();
        setTransactions(r.transactions.reverse() || []);
        setUserType(r.isAdmin ? "admin" : "user");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchWallet = async () => {
    try {
      const response = await fetch(`${url}/wallet`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (response.ok) {
        const walletData = await response.json();
        setWallet(walletData);
      }
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  const createTransaction = async (userId, type, amount) => {
    try {
      const response = await fetch(`${url}/createTransaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ userId, amount, type }),
      });
      const r = await response.json();
      if (response.ok) {
        console.log(r);
        return r.transaction._id;
      }
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };
  const updateTransactionRefId = async (transactionId, refId) => {
    try {
      const response = await fetch(`${url}/updateTransactionRefId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ transactionId, refId }), // Include refId in the request body
      });
      const data = await response.json(); // Handle response data

      if (response.ok) {
        return data; // Return the response data
      } else {
        throw new Error(data.message || "Failed to update transaction");
      }
    } catch (error) {
      console.error("Error updating transaction ref ID:", error);
      throw error; // Rethrow to handle in the component
    }
  };
  const updateTransactionUpiId = async (transactionId, upiId) => {
    try {
      const response = await fetch(`${url}/updateTransactionUpiId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token, // Assuming you're using an authentication token
        },
        body: JSON.stringify({ transactionId, upiId }), // Pass both transactionId and upiId in the body
      });

      const data = await response.json(); // Handle the JSON response

      if (response.ok) {
        return data; // Return the successful response data
      } else {
        throw new Error(data.message || "Failed to update UPI ID"); // Handle errors
      }
    } catch (error) {
      console.error("Error updating UPI ID:", error);
      throw error; // Rethrow to handle errors in the component
    }
  };

  const rechargeWallet = async (amount) => {
    try {
      const response = await axios.post(
        `${url}/api/recharge`,
        { amount },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (response.data.success) {
        // The payment is successful, update the wallet balance
        fetchWallet(); // Update wallet balance after recharge
        toast.success("Recharge successful");
      } else {
        toast.error(response.data.error || "Recharge failed");
      }
    } catch (error) {
      console.error("Recharge error:", error);
      toast.error("Error processing recharge");
    }
  };

  const withdrawFromWallet = async (amount) => {
    try {
      const response = await axios.post(
        `${url}/api/withdraw`,
        { amount },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (response.data.success) {
        fetchWallet(); // Update wallet balance after withdrawal
        toast.success("Withdrawal successful");
      } else {
        toast.error(response.data.error || "Withdrawal failed");
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast.error("Error processing withdrawal");
    }
  };

  useEffect(() => {
    if (token) {
      fetchWallet();
    }
  }, [token]);

  // Fetch user data and wallet when user is logged in
  useEffect(() => {
    if (isLogin) {
      userdata();
      fetchWallet();
      getUserTransactions();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        url,
        isLogin,
        userType,
        userdata,
        user,
        Login,
        Signup,
        token,
        storeToken,
        Logout,
        rechargeWallet,
        withdrawFromWallet,
        wallet,
        getUserTransactions,
        transactions,
        createTransaction,
        updateTransactionRefId,
        updateTransactionUpiId,
        TotalRecharge,
        TotalWithdrawal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
