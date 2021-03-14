const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");
const { Op } = require("sequelize");

// @route POST /source/create
// @desc CREATE SOURCE
// @access Private
router.post("/create", reqAuthentication, async (req, res) => {
  // FIND SOURCES THAT ARE NOT REVIEWED FOR CURRENT LOGGED IN USER
  // PULL USER FROM COOKIES
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      console.log("There is no token error: ", err.message);
      res.redirect("/login");
    } else {
      // IF VERIFY SUCCESS ALLOW USER TO VISIT PARTICULAR ROUTE
      console.log("decoded token", decodedToken);
      const finalToken = decodedToken;
      const userID = finalToken.id;

      // Grab ID of variety selected from form
      db.Variety.findOne({
        where: {
          name: req.body.variety,
        },
      })
        .then((data) => {
          console.log(data);
          const varietyID = data.dataValues.varietyID;
          // Save source to database
          db.Source.create({
            sourcename: req.body.name,
            sourcetype: req.body.sourcetype,
            date: req.body.date,
            reference: req.body.reference,
            VarietyVarietyID: varietyID,
            UserId: userID,
          }).then((data) => {
            console.log(data);
            res.redirect("/researchrecord");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  console.log(req.body);
});

module.exports = router;
