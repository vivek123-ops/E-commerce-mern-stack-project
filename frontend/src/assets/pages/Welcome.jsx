import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #131921 0%, #232f3e 50%, #37475a 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "800px",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          🛒 ShopSphere
        </h1>

        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "20px",
          }}
        >
          Welcome to Your Dream Shopping Destination
        </h2>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#d1d5db",
            lineHeight: "1.8",
            marginBottom: "40px",
          }}
        >
          Discover thousands of products, unbeatable prices, fast delivery, and
          a seamless shopping experience. Everything you need, all in one place.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/login">
            <button
              style={{
                padding: "15px 35px",
                fontSize: "18px",
                border: "none",
                borderRadius: "10px",
                background: "#ff9900",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/register">
            <button
              style={{
                padding: "15px 35px",
                fontSize: "18px",
                border: "2px solid white",
                borderRadius: "10px",
                background: "transparent",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Register
            </button>
          </Link>
        </div>

        <div
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3>🚚 Fast Delivery</h3>
            <p>Get products delivered quickly</p>
          </div>

          <div>
            <h3>💳 Secure Payments</h3>
            <p>100% safe transactions</p>
          </div>

          <div>
            <h3>⭐ Best Quality</h3>
            <p>Top-rated products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
