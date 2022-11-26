//untuk verify token jwt
const jwt = require("jsonwebtoken");
const { JWT_SECRET_ACCESS_TOKEN } = process.env;

module.exports = async (req, res, next) => {
  //jika middleware harus ada next
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_ACCESS_TOKEN);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};
