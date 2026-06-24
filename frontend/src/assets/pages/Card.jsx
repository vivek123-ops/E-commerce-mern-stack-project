import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const [totalprice, settotalprice] = useState("");

  const getCart = async () => {
    try {
      const response = await axios.post(
        "https://e-commerce-mern-stack-project-2.onrender.com/api/checklogin",
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setCart(response.data.userCard.cart || []);
      settotalprice(response.data.checkUser.totalPrice);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  const totalPrice = async (e) => {
    try {
      const response = await axios.post(
        "https://e-commerce-mern-stack-project-2.onrender.com/api/checklogin",
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      settotalprice(response.data.checkUser.totalPrice);
      console.log(settotalprice);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const deleteCart = async (productId) => {
    try {
      await axios.delete(
        `https://e-commerce-mern-stack-project-2.onrender.com/api/deletecard/${productId}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      getCart();
      totalPrice();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting cart item");
    }
  };

  useEffect(() => {
    if (token) {
      getCart();
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#131921",
        }}
      >
        🛒 My Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "100px",
            background: "white",
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🛍️ Your Cart is Empty</h2>
          <p>Add some products to start shopping</p>
        </div>
      ) : (
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          {cart.map((item) => (
            <div
              key={item.productId._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                background: "white",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.productId.photourl}
                alt={item.productId.productName}
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <div
                style={{
                  flex: 1,
                }}
              >
                <h2
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  {item.productId.productName}
                </h2>

                <p
                  style={{
                    color: "#555",
                    marginBottom: "10px",
                  }}
                >
                  {item.productId.description}
                </p>

                <p>
                  <strong>Category:</strong> {item.productId.category}
                </p>

                <p>
                  <strong>Rating:</strong> {item.productId.rating} ⭐
                </p>

                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
              </div>

              <div
                style={{
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    color: "green",
                    marginBottom: "15px",
                  }}
                >
                  ₹{item.productId.price}
                </h2>

                <button
                  onClick={() => deleteCart(item.productId._id)}
                  style={{
                    padding: "12px 20px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          ))}

          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
              textAlign: "right",
              marginTop: "30px",
            }}
          >
            <h1
              style={{
                color: "#131921",
                marginBottom: "20px",
              }}
            >
              Total: ₹{totalprice}
            </h1>

            <button
              style={{
                padding: "15px 35px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
