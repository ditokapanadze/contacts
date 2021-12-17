const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../error/ApiError");

const auth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.config = decoded;

    next();
    return;
  } catch (err) {
    next(ApiError.badRequest("invalid token"));
  }
};

module.exports = auth;
