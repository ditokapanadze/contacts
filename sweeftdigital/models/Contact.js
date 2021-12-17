const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  number: {
    required: true,
    type: String,
  },
  contacts: {
    type: Array,
    default: [
      { username: "დათო", number: "555689456" },
      { username: "მარი", number: "598652374" },
      { username: "ნინო", number: "598684354" },
      { username: "ნიკა", number: "599643357" },
    ],
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
