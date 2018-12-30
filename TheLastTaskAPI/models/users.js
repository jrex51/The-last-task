const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  password: String,
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("User", userSchema);
