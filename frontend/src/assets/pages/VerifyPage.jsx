import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const otpRef = useRef();

  const navigate = useNavigate();

  const location = useLocation();

  const { userName, email, password } = location.state;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://e-commerce-mern-stack-project-2.onrender.com/api/verify-otp",
        {
          userName: userName,
          email: email,
          password: password,
          providedOtp: otpRef.current.value,
        },
      );
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
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
        onSubmit={handleVerify}
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
          Verify OTP
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "gray",
          }}
        >
          OTP sent to {email}
        </p>

        <input
          ref={otpRef}
          type="number"
          placeholder="Enter OTP"
          style={{
            width: "100%",
            padding: "12px",
            margin: "20px 0",
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
          }}
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default Verify;
