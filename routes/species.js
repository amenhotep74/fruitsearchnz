const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");

// @route POST /species/create
// @desc CREATE SPECIE
// @access Requires login
router.post(
  "/create",
  check("name", "Name is required").not().isEmpty(),
  check("genus", "Genus is required").not().isEmpty(),
  check("species", "Species is required").not().isEmpty(),
  reqAuthentication,
  async (req, res, next) => {
    const validationErrors = validationResult(req);
    let errors = "";

    if (!validationErrors.isEmpty()) {
      // console.log("validation errors", validationErrors);
      return res.render("addspecies", {
        validationErrors: validationErrors.array(),
      });
    }
    // convert name to lowercase so it can be unique

    // Save fields to database
    db.Specie.create({
      name: req.body.name.toLowerCase(),
      species: req.body.species,
      genus: req.body.genus,
    })
      .then((specie) => {
        console.log("Specie", specie);
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
        return res.render("addspecies", { msg: error });
      });
  }
);

module.exports = router;
