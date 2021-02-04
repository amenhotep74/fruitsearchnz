const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");

// Require DB
const db = require("../models");

// @route POST /auth
// @desc Login user & get token
// @access Public
router.post("/", notReqAuthentication, async (req, res, next) => {
  // const { email, password } = req.body;

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
      } else {
        // IF EMAIL AND PASSWORD BOTH MATCH LOGIN
        const oneDay = 60 * 60 * 24;

        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: oneDay * 2,
          },
          (err, token) => {
            // Set cookie to JWT
            res.cookie("jwt", token, {
              maxAge: oneDay * 3,
              httpOnly: true,
            });
            res.redirect("/");
          }
        );
      }
      // var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      //   expiresIn: 86400, // 24 hours
      // }, (err, token) => {
      //   // Set cookie to JWT
      //   res.cookie("jwt", token, {
      //     maxAge: oneDay
      //   })
      // });

      // res.status(200).send({
      //   id: user.id,
      //   username: user.username,
      //   email: user.email,
      //   accessToken: token,
      // });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
