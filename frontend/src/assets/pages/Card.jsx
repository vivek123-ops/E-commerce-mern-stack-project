import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const [totalprice, settotalprice] = useState("");

  const getCart = async () => {
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
        "http://localhost:3000/api/checklogin",
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
      await axios.delete(`http://localhost:3000/api/deletecard/${productId}`, {
        headers: {
          Authorization: token,
        },
      });

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
        padding: "30px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <h2>Cart is Empty</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.productId._id}
              style={{
                display: "flex",
                gap: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "20px",
                alignItems: "center",
              }}
            >
              <img
                src={item.productId.photourl}
                alt={item.productId.productName}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h2>{item.productId.productName}</h2>

                <p>{item.productId.description}</p>

                <p>
                  Category:
                  {item.productId.category}
                </p>

                <p>
                  Rating:
                  {item.productId.rating} ⭐
                </p>

                <h3>₹{item.productId.price}</h3>

                <p>
                  Quantity:
                  {item.quantity}
                </p>
              </div>

              <div>
                <h2>₹{item.productId.price}</h2>

                <button
                  style={{
                    padding: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteCart(item.productId._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div
            style={{
              textAlign: "right",
              marginTop: "30px",
            }}
          >
            <h1>Total: ₹{totalprice}</h1>

            <button
              style={{
                padding: "12px 25px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
