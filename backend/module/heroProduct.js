const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  category: {
    type: String,
  },
  photourl: {
    type: String,
  },
});

module.exports = mongoose.model("heroPage", heroSchema);
