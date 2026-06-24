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
        width: "260px",
        background: "white",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "0.3s",
      }}
    >
      {/* Product Image */}
      <div
        style={{
          height: "180px",
          background: "#f8f9fa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <img
          src={photourl}
          alt={productName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Product Details */}
      <div
        style={{
          padding: "15px",
        }}
      >
        <h3
          style={{
            margin: "0",
            fontSize: "18px",
            color: "#131921",
            marginBottom: "8px",
          }}
        >
          {productName}
        </h3>

        <p
          style={{
            color: "#666",
            fontSize: "13px",
            minHeight: "40px",
            marginBottom: "10px",
          }}
        >
          {description.length > 50
            ? description.slice(0, 50) + "..."
            : description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              background: "#f1f3f6",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              color: "#333",
            }}
          >
            {category}
          </span>

          <span
            style={{
              color: "#ff9800",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            ⭐ {rating}
          </span>
        </div>

        <h2
          style={{
            color: "#28a745",
            fontSize: "24px",
            margin: "10px 0",
          }}
        >
          ₹{price}
        </h2>

        {role === "user" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <button
              onClick={addCart}
              style={{
                padding: "10px",
                background: card ? "#dc3545" : "#131921",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {card ? "🗑 Remove" : "🛒 Add Cart"}
            </button>

            <button
              onClick={addFavourite}
              style={{
                padding: "10px",
                background: favourite ? "#28a745" : "#ff4757",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
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
              gap: "8px",
            }}
          >
            <button
              style={{
                flex: 1,
                padding: "10px",
                background: "#ffc107",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✏️ Edit
            </button>

            <button
              onClick={deleteProduct}
              style={{
                flex: 1,
                padding: "10px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
