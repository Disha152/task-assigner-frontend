
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On app load, retrieve user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login function
  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post(
        "https://task-assigner-backend-8184.onrender.com/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const userData = res.data.user;
      const token = res.data.token;

      const completeUser = { ...userData, token };

      setUser(completeUser);

      // ✅ Save both user and token
      localStorage.setItem("user", JSON.stringify(completeUser));
      localStorage.setItem("token", token);

      return completeUser;
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    }
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
