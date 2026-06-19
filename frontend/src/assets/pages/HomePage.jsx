import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Component/Card";

const HomePage = () => {
  const token = localStorage.getItem("token");
  const [product, setproduct] = useState([]);
  const getProduct = async () => {
    try {
      const res = await axios.get(
        "https://e-commerce-mern-stack-project-2.onrender.com/api/getProduct",
      );
      setproduct(res.data.allProduct);
    } catch (error) {
      alert(error.response?.data?.message || "Server not responding");
    }
  };

  useEffect(() => {
    if (token) {
      getProduct();
    }
  }, [token]);

  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        flexWrap: "wrap",
        gap: "25px",
        justifyContent: "center",
      }}
    >
      {token ? null : <h1>please login first</h1>}
      {product.map((item) => (
        <ProductCard
          key={item._id}
          productName={item.productName}
          description={item.description}
          price={item.price}
          rating={item.rating}
          category={item.category}
          photourl={item.photourl}
          productId={item._id}
        />
      ))}
    </div>
  );
};

export default HomePage;
