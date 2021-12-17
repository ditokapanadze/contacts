const ApiError = require("../error/ApiError");

const callChek = async (req, res, next) => {
  const { number } = req.body;
  const { username } = req.body;

  if (/\d/.test(username)) {
    next(ApiError.badRequest("username should not contain any numbers"));
    return;
  }
  if (/[a-zA-Z]/g.test(number)) {
    next(ApiError.badRequest("number shouwld not contain letters"));
    return;
  }
  next();
};

module.exports = callChek;
