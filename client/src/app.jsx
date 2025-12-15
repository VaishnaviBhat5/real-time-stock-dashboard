import React, { useState, useEffect } from "react";
import Login from "./login.jsx";
import Dashboard from "./dashboard.jsx";

export default function App() {
  const [email, setEmail] = useState(localStorage.getItem("email") || null);

  useEffect(() => {
    if (email) {
      document.body.classList.add("dashboard");
    } else {
      document.body.classList.remove("dashboard");
    }
  }, [email]);

  return email ? (
    <Dashboard
      email={email}
      onLogout={() => {
        localStorage.removeItem("email");
        setEmail(null);
      }}
    />
  ) : (
    <Login
      onLogin={(e) => {
        localStorage.setItem("email", e);
        setEmail(e);
      }}
    />
  );
}
