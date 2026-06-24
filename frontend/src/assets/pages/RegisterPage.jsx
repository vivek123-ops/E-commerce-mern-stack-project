import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleref = useRef();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://e-commerce-mern-stack-project-2.onrender.com/api/register",
        {
          userName: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          role: roleref.current.value,
        },
      );

      alert(res.data.message);

      navigate("/verify", {
        state: {
          userName: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          role: roleref.current.value,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
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
        onSubmit={handleRegister}
        style={{
          width: "420px",
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
            marginBottom: "25px",
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
              color: "white",
            }}
          >
            Create Account
          </h2>

          <p
            style={{
              color: "#d1d5db",
            }}
          >
            Join us and start shopping today
          </p>
        </div>

        <input
          ref={nameRef}
          type="text"
          placeholder="Enter Name"
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
            marginBottom: "15px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <select
          ref={roleref}
          defaultValue="user"
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            boxSizing: "border-box",
          }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

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
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "20px",
          }}
        >
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#ff9900",
              marginLeft: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
