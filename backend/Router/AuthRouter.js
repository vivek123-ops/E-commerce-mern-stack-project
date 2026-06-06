const express = require("express");
const Auth = express.Router();
const user = require("../module/userModule");
const nodemailer = require("nodemailer");
const Otp = require("../module/otpmodule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthController = require("../Controller/AuthController");
const verify = require("../middleware/verifyUser");

Auth.post("/register", AuthController.register);

Auth.post("/verify-otp", AuthController.verify);

Auth.post("/login", AuthController.Login);

Auth.post("/checklogin", verify, AuthController.checkrole);

module.exports = Auth;
