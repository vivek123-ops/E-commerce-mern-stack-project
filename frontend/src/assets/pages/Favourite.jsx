import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../Component/Card";

const Favourite = () => {
  const [favourite, setFavourite] = useState([]);
  const token = localStorage.getItem("token");

  const getFavourite = async () => {
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
      setFavourite(response.data.userFavourites.favourite || []);
      getFavourite();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };
  useEffect(() => {
    if (token) {
      getFavourite();
    }
  }, []);

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
      {favourite.length <= 0 && <h1>no favourite</h1>}
      {favourite.map((item) => (
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

export default Favourite;
