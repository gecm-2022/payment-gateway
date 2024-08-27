import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext();

export const MycontextProvide = ({ children }) => {
  const url = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState("");
  const [wallet, setWallet] = useState(null);
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
        setUser(r);
        setUserType(r.isAdmin ? "admin" : "user");
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
      const response = await fetch(
        `${url}/api/transactions/getUserTransactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      if (response.ok) {
        const r = await response.json();
        setTransactions(r.transactions || []);
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

  const rechargeWallet = async (amount) => {
    try {
      const response = await axios.post(
        `${url}/api/transaction/recharge`,
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
        `${url}/api/transaction/withdraw`,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
