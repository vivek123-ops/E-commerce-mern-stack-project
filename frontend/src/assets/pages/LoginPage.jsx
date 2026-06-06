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
      const res = await axios.post("http://localhost:3000/api/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
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
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "350px",
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 0 10px gray",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          ref={emailRef}
          type="email"
          placeholder="Enter Email"
          style={{
            width: "100%",
            padding: "12px",
            margin: "15px 0",
            boxSizing: "border-box",
          }}
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter Password"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />
        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#131921",
            color: "white",
            border: "none",
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          Login
        </button>
        <p
          style={{
            textAlign: "center",
          }}
        >
          New User?
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              marginLeft: "5px",
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
