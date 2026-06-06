const express = require("express");
const verify = require("../middleware/verifyUser");
const User = express.Router();
const product = require("../module/productModule");
const user = require("../module/userModule");
const userController = require("../Controller/userController");

User.get("/getProduct", userController.getproduct);

User.post("/addFavourite/:productId", verify, userController.addfavourite);

User.delete(
  "/deletefavourite/:productId",
  verify,
  userController.deletefavourite,
);

User.post("/addcard/:productId", verify, userController.addcard);
User.delete("/deletecard/:productId", verify, userController.deleteCard);

User.post("/onemore/:productId", verify, userController.addmore);

User.delete("/deleteone/:productId", verify, userController.deleteone);

module.exports = User;
