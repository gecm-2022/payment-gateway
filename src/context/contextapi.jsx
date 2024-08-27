import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const MycontextProvide = ({ children }) => {
  const data = 1;
  const url = import.meta.env.VITE_API_URL;




  const [token, settoken] = useState(localStorage.getItem("token"));
  const [userType, setUserType] = useState("");
  const [user, setuser] = useState("");
 

  const storeToken = (servertoken) => {
    settoken(servertoken);
    return localStorage.setItem("token", servertoken);
  };

  let islogin = !!token;
  const Logout = () => {
    settoken("");
    setuser("");
    setallStudent("");
    setUserType("");
    toast.success("Logout....");

    return localStorage.removeItem("token");
  };
  const [showSidebar, setShowSidebar] = useState(false);

  const updateSidebarVisibility = (visibility) => {
    setShowSidebar(visibility);
  };

  const userdata = async () => {
    try {
      const response = await fetch(`${url}/auth/api/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (response.ok) {
        const r = await response.json();
        setuser(r);
      }
    } catch (error) {}
  };
 

  // login ...
  const Login = async (data) => {
    const r = await fetch(`${url}/auth/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await r.json();
    if (r.ok) {
      storeToken(res.authtoken);
      setUserType("admin");

      toast.success(res.message);
    } else {
      toast.error(res.error ? res.error : res);
    }
  };



  useEffect(() => {
    const initializeUser = async () => {
      if (islogin) {
        try {
          const response = await fetch(`${url}/auth/api/getuser`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          });
          if (response.ok) {
            const r = await response.json();
            setuser(r);
            setUserType(r.isadmin ? "admin" : "student");
            setpower(r.isadmin);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    initializeUser();
  }, [token, islogin, url]);


  return (
    <AuthContext.Provider
      value={{
        userType,
        setuser,
        data,
        url,
        storeToken,
        islogin,
        Logout,
        user,
        Login,
        token,
        userdata,
        updateSidebarVisibility,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authcontextValue = useContext(AuthContext);
  return authcontextValue;
};
