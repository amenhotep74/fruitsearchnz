const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
// Require DB
const db = require("../models");

// @route POST /users
// @desc REGISTER USER
// @access Public
router.post("/", async (req, res) => {
  //   See if user exists by email
  db.User.findOne({ where: { email: req.body.email } })
    .then((data) => {
      // If user exists
      if (data) {
        res.send({ msg: "User email already Exists" });
      } else {
        db.User.create({
          username: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          isAdmin: req.body.isAdmin,
          isSuperuser: req.body.isSuperuser,
        })
          .then((user) => {
            console.log("user: ", user);
            res.send({ msg: "User Registered Sucessfully" });
            res.redirect("/");
          })
          .catch((err) => {
            console.log("err: ", err);
            res.send({ msg: "User Register Error" });
            res.redirect("/register");
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.msg,
      });
    });
});

// @route POST /users/forgotpassword
// @desc Forgot password form submission
// @access Private
router.post("/", async (req, res) => {});

module.exports = router;
