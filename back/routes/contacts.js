const router = require("express").Router();
const User = require("../models/User");
const Call = require("../models/Call");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const verifyUser = require("../middleware/auth.js");
const callChek = require("../middleware/callChek.js");
var uuid = require("uuid");

// fetch all contacts
router.get("/", verifyUser, async (req, res, next) => {
  const username = req.config.username;

  try {
    //   აიდით მოვძებნიდი მარა მოთხოვნებში ეწერა რომ ტოკენში მარტო იუსერნეიმი უნდა შენახულიყო
    const user = await User.findOne({ username });
    if (!user) {
      next(ApiError.badRequest(`user ${username} not found`));
      return;
    }

    const contacts = user.contacts;
    res.status(200).json(contacts);
  } catch (err) {
    next({});
  }
});

// add new contact
router.post("/", verifyUser, async (req, res, next) => {
  const username = req.config.username;

  let { newContact } = req.body;
  newContact["_id"] = uuid.v4();

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { contacts: newContact } },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    next({});
  }
});

//edit contact
router.put("/edit/:id", verifyUser, async (req, res, next) => {
  const { id } = req.params;
  const { username } = req.config;
  const { newContact } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { username, "contacts._id": id },
      {
        $set: {
          "contacts.$.username": newContact.username,
          "contacts.$.number": newContact.number,
        },
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    next({});
  }
});

router.post("/search", async (req, res, next) => {
  const { token } = req.body.token;

  const searchValue = req.body.params.searchValue;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

  try {
    const user = await User.findOne({ username: decoded.username });
    // console.log(user);
    user.contacts.map((contact) => {
      if (
        contact.username.includes(searchValue) ||
        contact.number.includes(searchValue)
      ) {
        res.status(200).json(contact);
      }
    });
  } catch (err) {
    next({});
  }
});

// delete contact
router.put("/:id", verifyUser, async (req, res, next) => {
  const { id } = req.params;
  const { username } = req.config;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      {
        $pull: {
          contacts: { _id: id },
        },
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    next({});
  }
});

// make call
router.post("/call", verifyUser, callChek, async (req, res, next) => {
  const { username } = req.body;
  const { number } = req.body;
  const caller = req.config.username;

  try {
    const newCall = await new Call({
      reciever: username,
      number,
      caller,
    });

    const call = await newCall.save();

    res.status(200).json("success");
  } catch (err) {
    next({});
  }
});

module.exports = router;
