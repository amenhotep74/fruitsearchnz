const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");

// @route POST /users
// @desc REGISTER USER
// @access Public
router.post(
  "/",
  [
    // validation
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email.").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const validationErrors = validationResult(req);
    let errors = "";
    if (!validationErrors.isEmpty()) {
      // console.log("validation errors", validationErrors);
      return res.render("register", {
        validationErrors: validationErrors.array(),
      });
    }
    // if password and confirm password fields are not the same
    if (req.body.password != req.body.password2) {
      errors = "Passwords do not match.";
      return res.render("register", { msg: errors });
    }

    // See if user exists by email
    db.User.findOne({ where: { email: req.body.email } })
      .then((data) => {
        // If user exists
        if (data) {
          // res.send({ msg: "User email already Exists" });
          errors = "User email already Exists";
          // then re render register with that error
          return res.render("register", { msg: errors });
        } else {
          db.User.create({
            username: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            isAdmin: req.body.isAdmin,
            isSuperuser: req.body.isSuperuser,
          })
            .then((user) => {
              // Then create JWT
              const oneHour = 60 * 60;
              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET_KEY,
                {
                  expiresIn: oneHour,
                },
                (err, token) => {
                  if (err) throw Error();
                  res.cookie("jwt", token, {
                    maxAge: oneHour * 24,
                    httpOnly: true,
                  });
                  console.log(
                    "User is saved to the database and cookie created"
                  );
                  res.redirect("/");
                }
              );
              // res.redirect("/");
            })
            .catch((err) => {
              console.log(err);
              res.redirect("/");
              // errors = "User Register Error, Try again";
              // // res.send({ msg: "User Register Error" });
              // res.render("register", { msg: errors });
            });
        }
      })
      .catch((err) => {
        return res.render("register", { msg: errors });
        // res.status(500).send({
        //   msg: err.msg,
        // });
      });
  }
);

// @route POST /users/forgotpassword
// @desc Forgot password form submission
// @access Private
router.post("/", async (req, res) => {});

module.exports = router;
