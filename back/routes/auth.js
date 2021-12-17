const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

router.post("/signup", async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    //   check if email is already in use
    const chekmMail = await User.findOne({ email: req.body.email });
    if (chekmMail) {
      next(
        ApiError.badRequest(
          "Email is alreday in use, did you forget your password?"
        )
      );
      return;
    }
    const checkUsername = await User.findOne({ username: req.body.username });
    if (checkUsername) {
      next(ApiError.badRequest("Username is taken"));
      return;
    }

    //   return res
    //     .status(400)
    //     .json("Email is alreday in use, did you forget your password?");

    //   generate hashes pass
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // create user
    const newUser = await new User({
      username,
      email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    next({});
  }
});

// login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //   chek if email is correct
    const user = await User.findOne({ email });

    if (!user) {
      next(ApiError.badRequest("user not found"));
      return;
    }
    // chek if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      next(ApiError.badRequest("wrong password"));
      return;
    }

    // generate jwt

    const token = jwt.sign(
      { username: user.username },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    next({});
  }
});

module.exports = router;
