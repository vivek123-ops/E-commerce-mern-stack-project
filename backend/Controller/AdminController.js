const upload = require("../middleware/multer");
const user = require("../module/userModule");
const imagekit = require("../config/imageKit");
const product = require("../module/productModule");
const verify = require("../middleware/verifyUser");

const uploadProduct = async (req, res) => {
  try {
    const findUser = await user.findById(req.userId);
    if (findUser.role.toString() !== "admin") {
      return res.status(401).json({
        message: "you have not authorized this task",
      });
    }
    const { productName, description, price, rating, category } = req.body;
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: Date.now() + "-" + req.file.originalname,
    });
    const newProduct = await product.create({
      productName,
      description,
      price,
      rating,
      category,
      photourl: result.url,
    });
    res.status(201).json({
      success: true,
      message: "product is added",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error found in server side upload-post",
    });
  }
};

const editpost = async (req, res) => {
  try {
    const { productId } = req.params;
    const findUser = await user.findById(req.userId);
    if (findUser.role.toString() !== "admin") {
      return res.status(400).json({
        success: false,
        message: "you not authorized perfomed this task",
      });
    }
    const { productName, description, price, rating, category } = req.body;
    const findProduct = await product.findById(productId);
    // phle wala product ka image nikloe
    const imageurl = findProduct.photourl;
    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: Date.now() + "-" + req.file.originalname,
      });
      imageurl = result.url;
    }
    //upade the all value
    findProduct.productName = productName || findProduct.productName;
    findProduct.description = description || findProduct.description;
    findProduct.price = price || findProduct.price;
    findProduct.rating = rating || findProduct.rating;
    findProduct.category = category || findProduct.category;
    findProduct.photourl = imageurl;
    await findProduct.save();
    res.status(201).json({
      success: false,
      message: "product is  edit ",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error found in server side editpost",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { productId } = req.params;
    const findUser = await user.findById(req.userId);
    if (findUser.role.toString() !== "admin") {
      return res.status(400).json({
        success: false,
        message: "you not authorized this task",
      });
    }
    const findProduct = await product.findById(productId);
    await findProduct.deleteOne();
    res.status(201).json({
      message: "product is deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error found in server side in deletedpost",
    });
  }
};

module.exports = {
  uploadProduct,
  editpost,
  deletePost,
};
