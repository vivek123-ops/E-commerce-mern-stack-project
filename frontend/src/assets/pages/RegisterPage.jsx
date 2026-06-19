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
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: "350px",
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 0 10px gray",
        }}
      >
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Register
        </h2>

        <input
          ref={nameRef}
          type="text"
          placeholder="Enter Name"
          style={{
            width: "100%",
            padding: "12px",
            margin: "15px 0",
            boxSizing: "border-box",
          }}
        />

        <input
          ref={emailRef}
          type="email"
          placeholder="Enter Email"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
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
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        <select
          value={roleref}
          ref={roleref}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          <option value="user">User</option>

          <option value="admin">Admin</option>
        </select>

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#131921",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Already have account?
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "blue",
              marginLeft: "5px",
              cursor: "pointer",
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
