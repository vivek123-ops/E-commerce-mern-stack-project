import axios, { toFormData } from "axios";
import React, { useRef } from "react";

const AddProduct = () => {
  const productNameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const ratingRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();

  const token = localStorage.getItem("token");

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("productName", productNameRef.current.value);

      formData.append("description", descriptionRef.current.value);

      formData.append("price", priceRef.current.value);

      formData.append("rating", ratingRef.current.value);

      formData.append("category", categoryRef.current.value);

      formData.append("image", imageRef.current.files[0]);

      const res = await axios.post(
        "http://localhost:3000/api/upload-post",
        formData,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Product upload failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2",
      }}
    >
      <form
        onSubmit={handleAddProduct}
        style={{
          width: "400px",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px gray",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Add Product</h2>

        <input
          ref={productNameRef}
          placeholder="Product Name"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        <textarea
          ref={descriptionRef}
          placeholder="Description"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        <input
          ref={priceRef}
          type="number"
          placeholder="Price"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        <input
          ref={ratingRef}
          type="number"
          placeholder="Rating"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        <input
          ref={categoryRef}
          placeholder="Category"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        <input
          ref={imageRef}
          type="file"
          style={{
            width: "100%",
            marginBottom: "15px",
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
