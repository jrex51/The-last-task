const express = require("express");
const router = express.Router();
const book = require("../models/book");

router.post("/", (req, res) => {
  const post = new book({
    book: req.body.book_id,
    title: req.body.title,
    description: req.body.description
  });
  post
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/Book/:id", (req, res) => {
  Post.find({ Book: req.params.id })
    .populate("Book")
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("Book")
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
