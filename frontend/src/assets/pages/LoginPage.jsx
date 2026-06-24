import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://e-commerce-mern-stack-project-2.onrender.com/api/login",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      );
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "error from fronted side");
    }
  };

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
      <form
        onSubmit={handleLogin}
        style={{
          width: "400px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              color: "white",
              marginBottom: "10px",
            }}
          >
            🛒 ShopSphere
          </h1>

          <h2
            style={{
              color: "#fff",
            }}
          >
            Welcome Back
          </h2>

          <p
            style={{
              color: "#d1d5db",
            }}
          >
            Login to continue shopping
          </p>
        </div>

        <input
          ref={emailRef}
          type="email"
          placeholder="Enter Email"
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter Password"
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: "#ff9900",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "20px",
          }}
        >
          New User?
          <span
            style={{
              color: "#ff9900",
              cursor: "pointer",
              marginLeft: "5px",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
