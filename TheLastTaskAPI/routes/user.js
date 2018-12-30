const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const uuidv1 = require("uuid/v1");

router.get("/", (req, res) => {
  User.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post("/save", (req, res) => {
  let image = req.files.thumbnail;

  fileName = uuidv1();

  image.mv(`./public/${fileName}.png`, function(err) {
    if (err) return res.status(500).send(err);
    res.send("File uploaded!");
  });
});

router.post("/register", (req, res) => {
  bcrypt.genSalt(10).then(salt => {
    bcrypt.hash(req.body.password, salt).then(hashed => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        password: hashed,
        email: req.body.email
      });
      user
        .save()
        .then(result => {
          const token = jwt.sign(
            { _id: result._id, exp: Date.now() + 1000 * 60 },
            "key"
          );
          res.header({ "x-auth-token": token }).send("New user has been added");
        })
        .catch(err => {
          res.send(err);
        });
    });
  });
});

router.post("/checKlogin", (req, res) => {
  const token = req.headers.token;
  if (token) {
    try {
      let payload = jwt.verify(token, "key");
      res.send("you are logged in");
    } catch (err) {
      res.status(400).send("you have to login again");
    }
  } else {
    res.send("you need to login first!");
  }
});

router.post("/login", (req, res) => {
  const validating = userValidating(req.body);
  if (validating.error) {
    res.status(400).send(validating.error);
  } else {
    User.findOne({ email: req.body.email })
      .then(result => {
        bcrypt.compare(req.body.password, result.password, function(
          err,
          response
        ) {
          if (response) {
            const token = jwt.sign({ _id: result._id }, "key");
            res.header({ "x-auth-token": token }).send("Done");
          } else {
            res.status(400).send("incorrect info, try again!");
          }
        });
      })
      .catch(err => {
        res.status(404).send("there is no user with this name");
      });
  }
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).send("there is no user with this name");
      }
      res.send(result);
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
});

router.post("/", (req, res) => {
  const validating = userValidating(req.body);
  if (validating.error) {
    res.status(400).send(validating.error);
  } else {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      age: req.body.age
    });
    const v = user.validateSync();
    if (v) res.status(400).send("somthing went wrong");
    user
      .save()
      .then(result => {
        res.send("new user added");
        console.log(result);
      })
      .catch(err => {
        res.status(401).send(err);
        console.log(err);
      });
  }
});

router.put("/:id", (req, res) => {
  const validating = userValidating(req.body);
  if (validating.error) {
    res.status(400).send(validating.error.details);
  } else {
    User.updateOne({ _id: req.params.id }, { $set: req.body })
      .then(result => {
        res.send(`Number of users is ${result.n}`);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
});

router.delete("/:id", (req, res) => {
  User.remove({ name: req.params.id })
    .then(result => {
      res.send(`deleted users is ${result.n}`);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

function userValidating(user) {
  const userSchema = {
    email: Joi.string()
      .min(3)
      .required(),
    password: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(user, userSchema);
}

module.exports = router;
