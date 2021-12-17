const mongoose = require("mongoose");

const CallSchema = new mongoose.Schema({
  reciever: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  caller: {
    type: String,
    required: true,
  },
  CallDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Call", CallSchema);
