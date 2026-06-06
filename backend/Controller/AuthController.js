const express = require("express");
const Auth = express.Router();
const user = require("../module/userModule");
const nodemailer = require("nodemailer");
const Otp = require("../module/otpmodule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const emailexit = await user.findOne({ email });
    if (emailexit) {
      return res.status(400).json({
        success: false,
        message: "user also exit",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    // otp send karo
    await Otp.create({
      email,
      otp,
    });
    // set up nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vivekshrivastav325@gmail.com",
        pass: "ffussdlyjyalysrr",
      },
    });

    await transporter.sendMail({
      from: " vivekshrivastav325@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });
    res.status(201).json({
      success: true,
      message: "OTP is succesful send",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "error from server side",
    });
  }
};

const verify = async (req, res) => {
  try {
    const { userName, email, password, providedOtp } = req.body;
    const emailOtp = await Otp.findOne({ email });

    if (!emailOtp) {
      return res.status(400).json({
        success: false,
        message: "please register first",
      });
    }
    if (emailOtp.otp.toString() !== providedOtp.toString()) {
      return res.status(400).json({
        success: false,
        message: "OTP is incorrect ",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    await user.create({
      userName,
      email,
      password: hashpassword,
    });
    await Otp.deleteOne({ email });
    res.status(201).json({
      success: true,
      message: "user is created",
    });
  } catch (error) {
    res.status(400).json({
      message: "server side problem in verify-otp ",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "user not found",
      });
    }
    // password match karo
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        message: " password is incorrect",
      });
    }
    const token = await jwt.sign(
      {
        userId: existingUser._id,
      },
      "mysecretkey",
      {
        expiresIn: "7d",
      },
    );
    res.status(201).json({
      success: true,
      message: "login succesful",
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "problem arive login",
    });
  }
};

const checkrole = async (req, res) => {
  try {
    const checkUser = await user.findById(req.userId);
    const userFavourites = await user
      .findById(req.userId)
      .populate("favourite");
    const userCard = await user.findById(req.userId).populate("cart.productId");
    if (checkUser.role.toString() === "admin") {
      return res.status(201).json({
        success: true,
        message: "role admin",
        role: "admin",
        checkUser,
      });
    }
    res.status(201).json({
      success: true,
      message: "role user",
      role: "user",
      checkUser,
      userFavourites,
      userCard,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "error found in checkrole",
    });
  }
};

module.exports = {
  register,
  Login,
  verify,
  checkrole,
};
