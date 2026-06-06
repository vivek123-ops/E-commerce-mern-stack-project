const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Auth = require("./Router/AuthRouter");
const User = require("./Router/userRouter");
const Admin = require("./Router/AdminRouter");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", Auth);
app.use("/api", User);
app.use("/api", Admin);

const serverStart = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("backed is connected");
    app.listen(3000, () => {
      console.log("server is connected");
    });
  } catch (error) {
    console.log("server problem", error);
  }
};

serverStart();
