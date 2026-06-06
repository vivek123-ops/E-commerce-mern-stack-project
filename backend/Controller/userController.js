const product = require("../module/productModule");
const user = require("../module/userModule");
const express = require("express");
const { verify } = require("./AuthController");

const getproduct = async (req, res) => {
  try {
    const allProduct = await product.find();
    res.status(201).json({
      success: true,
      message: "Welocome User Panel",
      allProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "error found server side in getProduct",
    });
  }
};

const addfavourite = async (req, res) => {
  try {
    const { productId } = req.params;

    const findUser = await user.findById(req.userId);

    const checkfavourite = findUser.favourite.some(
      (id) => id.toString() === productId,
    );

    if (checkfavourite) {
      return res.status(400).json({
        success: false,
        message: "Product already added",
      });
    }

    findUser.favourite.push(productId);

    await findUser.save();

    res.status(201).json({
      success: true,
      message: "Favourite added",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletefavourite = async (req, res) => {
  try {
    const { productId } = req.params;
    const findUser = await user.findById(req.userId);
    await findUser.favourite.pull(productId);
    await findUser.save();
    res.status(201).json({
      success: true,
      message: "product is deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "error is found in deletefavourite",
    });
  }
};

const addcard = async (req, res) => {
  try {
    const { productId } = req.params;
    const findUser = await user.findById(req.userId);
    const findProduct = await product.findById(productId);
    findUser.cart.push({
      productId,
    });
    findUser.totalPrice += findProduct.price;
    await findUser.save();
    res.status(201).json({
      success: true,
      message: "product is added in your  card",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "error found in addcard",
    });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { productId } = req.params;
    const findUser = await user.findById(req.userId);
    const findProduct = await product.findById(productId);
    findUser.cart.pull({
      productId: productId,
    });
    findUser.totalPrice -= findProduct.price;
    await findUser.save();
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error found in deletecard",
    });
  }
};

const addmore = async (req, res) => {
  try {
    const { productId } = req.params;
    const findUser = await user.findById(req.userId);
    const findProduct = await product.findById(productId);
    const cardProduct = await findUser.cart.find(
      (item) => item.productId.toString() === productId,
    );
    cardProduct.quantity += 1;
    findUser.totalPrice += findProduct.price;
    await findUser.save();
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "error found in server side in onemore",
    });
  }
};

const deleteone = async (req, res) => {
  try {
    const { productId } = req.params;
    const findUser = await user.findById(req.userId);
    const findProduct = await product.findById(productId);
    const cardproduct = await findUser.cart.find(
      (item) => item.productId.toString() === productId,
    );
    if (cardproduct.quatity <= 1) {
      findUser.cart.pull(productId);
      return res.status(201).json({
        success: true,
      });
    }
    cardproduct.quantity -= 1;
    findUser.totalPrice -= findProduct.price;
    await findUser.save();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "error found in deleteone",
    });
  }
};

module.exports = {
  getproduct,
  addfavourite,
  deletefavourite,
  addcard,
  addmore,
  deleteone,
  deleteCard,
};
