import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [role, setrole] = useState();

  const handlerole = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/checklogin",
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setrole(response.data.role);
    } catch (error) {
      alert(error.response?.data?.message || "error from fronted side");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setrole("");
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      handlerole();
    }
  }, [token]);

  return (
    <div
      style={{
        height: "70px",
        backgroundColor: "#131921",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        color: "white",
      }}
    >
      {/* Logo */}

      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        ShopNow
      </div>

      {/* Search */}

      <div
        style={{
          display: "flex",
          width: "40%",
        }}
      >
        <input
          placeholder="Search products..."
          style={{
            width: "100%",
            padding: "12px",
            outline: "none",
          }}
        />

        <button
          style={{
            padding: "12px 20px",
            background: "#febd69",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Menu */}

      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        {token ? (
          <>
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Home
            </span>

            {role === "user" && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/productPage")}
              >
                Products
              </span>
            )}
            {role === "user" && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/favourite")}
              >
                Favourite
              </span>
            )}
            {role === "user" && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/card")}
              >
                🛒 Cart
              </span>
            )}

            {role === "admin" && (
              <span
                onClick={() => navigate("/addProduct")}
                style={{ cursor: "pointer" }}
              >
                ADD Product
              </span>
            )}

            <button
              onClick={logout}
              style={{
                padding: "10px 20px",
                background: "#ff9900",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 20px",
              background: "#ff9900",
              border: "4px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
