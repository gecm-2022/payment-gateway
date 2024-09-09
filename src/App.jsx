import { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/contextapi";
import Dashborad from "./pages/Dashborad";
import Error from "./pages/Error";
import Account from "./pages/Account";
import Privated from "./ProtectedFiles/Protected";
import Logout from "./pages/Logout";
import SignUpPage from "./pages/SignupPage";
import Transaction from "./pages/Transactions";
import Recharge from "./pages/Recharge";
import WalletWithdraw from "./pages/WalletWithdraw";
import PaymentPage from "./Components/Payment";
import AdminDashboard from "./pages/AdminDasboard";
import UpiPaymentPage from "./Components/UpiPayment";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </>
  );
}

function MainContent() {
  const { user, updateSidebarVisibility, userType } = useAuth();

  return (
    <div className="flex flex-col select-none min-h-screen ">
      <Navbar />
      <div className=" flex flex-1 w-full ">
        <Suspense fallback={"loading"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/contact" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/logout" element={<Logout />} />

            <Route
              path="/account"
              element={
                <Privated element={<Account />}  />
              }
            />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
             
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/recharge" element={<Recharge />} />
              <Route path="/withdraw" element={<WalletWithdraw />} />
              <Route path="/confirm-payment/:transactionId" element={<PaymentPage />} />
              <Route path="/confirm-withdrawal/:transactionId" element={<UpiPaymentPage />} />


            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
