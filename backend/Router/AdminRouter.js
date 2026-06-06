const express = require("express");
const Admin = express.Router();
const AdminController = require("../Controller/AdminController");
const verify = require("../middleware/verifyUser");
const upload = require("../middleware/multer");
const verifyUser = require("../middleware/verifyUser");

Admin.post(
  "/upload-post",
  verify,
  upload.single("image"),
  AdminController.uploadProduct,
);

Admin.put(
  "/editPost/:productId",
  verify,
  upload.single("image"),
  AdminController.editpost,
);

Admin.delete("/deletePost/:productId", verify, AdminController.deletePost);

module.exports = Admin;
