import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./assets/Component/Header";
import HomePage from "./assets/pages/HomePage";
import Login from "./assets/pages/LoginPage";
import Register from "./assets/pages/RegisterPage";
import Verify from "./assets/pages/VerifyPage";
import AddProduct from "./assets/pages/AddProduct";
import Favourite from "./assets/pages/Favourite";
import Cart from "./assets/pages/Card";
import ProductPage from "./assets/pages/ProductPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/card" element={<Cart />}></Route>
        <Route path="/productPage" element={<ProductPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
