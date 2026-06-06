const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "mysecretkey");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "user not verify",
    });
  }
};

module.exports = verifyUser;
