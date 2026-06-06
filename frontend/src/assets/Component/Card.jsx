import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductCard = ({
  productName,
  description,
  price,
  rating,
  category,
  photourl,
  productId,
}) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [favourite, setFavourite] = useState(false);
  const [card, setcard] = useState(false);

  const token = localStorage.getItem("token");

  // Get Logged In User
  const findUser = async () => {
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
      const userData = response.data.checkUser;
      setUser(userData);
      setRole(response.data.role);
      setFavourite(userData?.favourite?.includes(productId));
      setcard(
        userData?.cart?.some((item) => item.productId.toString() === productId),
      );
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching user");
    }
  };

  // Add / Remove Favourite
  const addFavourite = async () => {
    try {
      if (!token) {
        return alert("Please Login First");
      }
      if (favourite) {
        const res = await axios.delete(
          `http://localhost:3000/api/deletefavourite/${productId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        alert(res.data.message);
        setFavourite(false);
      } else {
        const res = await axios.post(
          `http://localhost:3000/api/addFavourite/${productId}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          },
        );

        alert(res.data.message);
        setFavourite(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // add card

  const addCart = async () => {
    try {
      if (card) {
        const response = await axios.delete(
          `http://localhost:3000/api/deletecard/${productId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setcard(false);
      } else {
        const response = await axios.post(
          `http://localhost:3000/api/addcard/${productId}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setcard(true);
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "error from addcard in fronted side",
      );
    }
  };

  // delete post
  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/deletePost/${productId}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      alert(response.data.message);

      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (token) {
      findUser();
    }
  }, [token, productId]);

  return (
    <div
      style={{
        width: "280px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        background: "white",
      }}
    >
      {/* Product Image */}
      <div
        style={{
          height: "200px",
          background: "#f2f2f2",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "10px",
        }}
      >
        <img
          src={photourl}
          alt={productName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <h3>{productName}</h3>

      <p
        style={{
          color: "#666",
          fontSize: "14px",
        }}
      >
        {description}
      </p>

      <p>
        <strong>Category:</strong> {category}
      </p>

      <p>⭐ {rating}</p>

      <h2
        style={{
          color: "green",
        }}
      >
        ₹{price}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {role === "user" && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button
              onClick={addCart}
              style={{
                padding: "10px 16px",
                background: card ? "#dc3545" : "#131921",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                width: "auto",
                minWidth: "120px",
              }}
            >
              {card ? "🗑 Remove" : "🛒 Add Cart"}
            </button>

            <button
              onClick={addFavourite}
              style={{
                padding: "10px 16px",
                background: favourite ? "#28a745" : "#ff4757",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                width: "auto",
                minWidth: "140px",
              }}
            >
              {favourite ? "❤️ Remove" : "🤍 Favourite"}
            </button>
          </div>
        )}

        {role === "admin" && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button
              style={{
                flex: 1,
                padding: "10px",
                background: "#ffc107",
                color: "black",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            <button
              style={{
                flex: 1,
                padding: "10px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={deleteProduct}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
