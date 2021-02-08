const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");

// @route POST /variety/create
// @desc CREATE VARIETY
// @access Requires login
router.post("/create", reqAuthentication, async (req, res, next) => {
  console.log(req.body.name);
  console.log(req.body.species);
  console.log(req.body.genus);
  console.log(req.body.description);
  // Query and get ID from species with value from select
  db.Specie.findAll({
    attributes: ["specieID"],
    where: {
      name: req.body.species,
    },
  })
    .then((data) => {
      //   console.log("Specie Found: ", data);
      const foundSpecieID = data[0].dataValues.specieID;
      console.log(foundSpecieID);

      // Save fields to database
      db.Variety.create({
        name: req.body.name,
        characteristics: req.body.characteristics,
        genus: req.body.genus,
        // Foreign Key
        SpecieSpecieID: foundSpecieID,
      })
        .then((variety) => {
          console.log("Variety", variety);
          res.redirect("/");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
