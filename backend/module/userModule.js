const mongoose = require("mongoose");
const product = require("./productModule");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  favourite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],

  role: {
    type: String,
    enum: ["admin", "user"],
  },

  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("user", UserSchema);
