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
router.post("/create", reqAuthentication, async (req, res, next) => {
  // Save fields to database
  db.Specie.create({
    name: req.body.name,
    description: req.body.description,
    genus: req.body.genus,
  })
    .then((specie) => {
      console.log("Specie", specie);
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
