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
router.post(
  "/create",
  check("name", "Please include a valid email.").not().isEmpty(),
  check("species", "Species is required").not().isEmpty(),
  check("characteristics", "Characteristics is required").not().isEmpty(),
  reqAuthentication,
  async (req, res, next) => {
    const validationErrors = validationResult(req);
    let errors = "";
    if (!validationErrors.isEmpty()) {
      // console.log("validation errors", validationErrors);
      return res.render("addvariety", {
        validationErrors: validationErrors.array(),
      });
    }

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
          // Foreign Key
          SpecieSpecieID: foundSpecieID,
        })
          .then((variety) => {
            console.log("Variety", variety);
            res.redirect("/");
          })
          .catch((error) => {
            console.log(error);
            errors = "There was an error try again.";
            return res.render("addvariety", { msg: errors });
          });
      })
      .catch((err) => {
        console.log(err);
        errors = "There was an error try again.";
        return res.render("addvariety", { msg: errors });
      });
  }
);

module.exports = router;
