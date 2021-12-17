const mongoose = require("mongoose");
var uuid = require("uuid");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  contacts: {
    type: Array,
    default: [
      { username: "დათო", number: "555689456", _id: uuid.v4() },
      { username: "მარი", number: "598652374", _id: uuid.v4() },
      { username: "ნინო", number: "598684354", _id: uuid.v4() },
      { username: "ნიკა", number: "599643357", _id: uuid.v4() },
    ],
  },
});

module.exports = mongoose.model("User", UserSchema);
