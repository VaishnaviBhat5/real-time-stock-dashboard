/*import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL, {
  transports: ["websocket"],
});
export default function Dashboard({ email, onLogout }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [prices, setPrices] = useState({});

  const supportedStocks = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

  useEffect(() => {
    socket.on("priceUpdate", (data) => {
      if (subscriptions.includes(data.stock)) {
        setPrices((prev) => ({ ...prev, [data.stock]: data.price }));
      }
    });
    return () => socket.off("priceUpdate");
  }, [subscriptions]);

  const handleSubscribe = (stock) => {
    if (!subscriptions.includes(stock)) {
      setSubscriptions([...subscriptions, stock]);
      socket.emit("subscribe", { email, stock });
    }
  };

  return (
    <div className="dashboard-container" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", padding: "20px 0" }}>
      <div className="dashboard-header">
        <h2> Dashboard - {email}</h2>
        <button id="logout" onClick={onLogout}>Logout</button>
      </div>

      <h3>Subscribe to Stocks</h3>
      <div className="stock-buttons">
        {supportedStocks.map((stock) => (
          <button
            key={stock}
            onClick={() => handleSubscribe(stock)}
            disabled={subscriptions.includes(stock)}
          >
            {stock}
          </button>
        ))}
      </div>

      <h3>Subscribed Stocks</h3>
      <div className="stock-grid">
        {subscriptions.map((stock) => (
          <div key={stock} className="stock-card">
            <h4>{stock}</h4>
            <p className={prices[stock] >= 0 ? "price-up" : "price-down"}>
              ${prices[stock] || "..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
*/
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function Dashboard({ email, onLogout }) {
  const socketRef = useRef(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [prices, setPrices] = useState({});

  const supportedStocks = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Connecting to backend:", backendUrl);

    socketRef.current = io(backendUrl, {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Connected:", socketRef.current.id);
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("❌ Socket error:", err.message);
    });

    socketRef.current.on("priceUpdate", ({ stock, price }) => {
      setPrices((prev) => ({
        ...prev,
        [stock]: price,
      }));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSubscribe = (stock) => {
    if (!subscriptions.includes(stock)) {
      setSubscriptions((prev) => [...prev, stock]);
      socketRef.current.emit("subscribe", { email, stock });
    }
  };

  return (
    <div
      className="dashboard-container"
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
      }}
    >
      <div className="dashboard-header">
        <h2>Dashboard - {email}</h2>
        <button id="logout" onClick={onLogout}>
          Logout
        </button>
      </div>

      <h3>Subscribe to Stocks</h3>
      <div className="stock-buttons">
        {supportedStocks.map((stock) => (
          <button
            key={stock}
            onClick={() => handleSubscribe(stock)}
            disabled={subscriptions.includes(stock)}
          >
            {stock}
          </button>
        ))}
      </div>

      <h3>Subscribed Stocks</h3>
      <div className="stock-grid">
        {subscriptions.map((stock) => (
          <div key={stock} className="stock-card">
            <h4>{stock}</h4>
            <p>${prices[stock] || "..."}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
