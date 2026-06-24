import React from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #131921 0%, #232f3e 50%, #37475a 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "500px",
          textAlign: "center",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          padding: "50px",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            marginBottom: "10px",
          }}
        >
          🚧
        </h1>

        <h2
          style={{
            color: "white",
            marginBottom: "15px",
          }}
        >
          Product Page Coming Soon
        </h2>

        <p
          style={{
            color: "#d1d5db",
            lineHeight: "1.8",
            marginBottom: "25px",
          }}
        >
          We're working hard to bring you an amazing product details experience.
          This page is currently under development.
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "14px 30px",
            background: "#ff9900",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          🏠 Back To Home
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
