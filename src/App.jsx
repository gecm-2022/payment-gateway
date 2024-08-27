import { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoginPage from "./pages/LoginPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
          <Suspense fallback={"loading"}>
        <div className="h-screen ">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Footer />
        </div>
          </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
