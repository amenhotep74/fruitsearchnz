const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");
const { Op, col, fn } = require("sequelize");

// Tree register route
router.get("/", async (req, res, next) => {
  db.Plant.findAll({
    attributes: [
      "plantID",
      "type",
      "rootstock",
      "synonyms",
      "identitycertain",
      "public",
      "maintainedneglected",
      "gpslat",
      "gpslong",
      "notes",
      "fruitripedate",
      "age",
      "height",
      "trunkdiameter",
      "diseases",
      [fn("date_format", col("plant.blossomdate"), "%d-%m-%Y"), "BlossomDate"],
      [
        fn("date_format", col("plant.fruitripedate"), "%d-%m-%Y"),
        "fruitRipeDate",
      ],
    ],
    include: [{ model: db.Variety, attributes: ["name"] }],
  })
    .then((data) => {
      console.log(data);
      // Get variety
      console.log(data[0].dataValues.Variety.name);
      res.render("treeregister", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
