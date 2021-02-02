const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Require DB
const db = require("../models");

// @route /users
// @desc Get the current user logged in from token
// @access Private
router.get("/", auth, async (req, res) => {
  res.send("Route Accessed");
});

// @route POST /auth
// @desc Login user & get token
// @access Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Find user in db with email
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.jwtSecret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
