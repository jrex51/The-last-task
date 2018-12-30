const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  Book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  title: {
    type: String,
    required: [true, "You have to set a Name!"]
  },
  description: String
});

module.exports = mongoose.model("Book", bookSchema);
