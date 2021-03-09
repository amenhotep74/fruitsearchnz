const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");
const { Op } = require("sequelize");

router.post(
  "/create",
  check("name", "Please include a valid name.").not().isEmpty(),
  check("address", "Address is required").not().isEmpty(),
  check("suburb", "Suburb is required").not().isEmpty(),
  check("city", "City is required").not().isEmpty(),
  check("province", "Province is required").not().isEmpty(),
  check("postcode", "Postcode must be a number and not be empty")
    .not()
    .isEmpty()
    .isNumeric(),
  check("postcode", "Postcode must be valid.").isLength({ min: 4, max: 4 }),
  check("ruraldelivery", "Rural delivery is required.").not().isEmpty(),
  reqAuthentication,
  (req, res, next) => {
    const validationErrors = validationResult(req);
    let errors = "";
    if (!validationErrors.isEmpty()) {
      // console.log("validation errors", validationErrors);
      return res.render("addlocation", {
        validationErrors: validationErrors.array(),
      });
    }

    console.log(req.body);
    // pull data from form inputs
    db.Location.create({
      name: req.body.name,
      address: req.body.address,
      province: req.body.province,
      city: req.body.city,
      suburb: req.body.suburb,
      ruraldelivery: req.body.ruraldelivery,
      gpslat: req.body.gpslat,
      gpslong: req.body.gpslong,
    })
      .then((data) => {
        console.log(data);
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/addlocation");
      });
  }
);

module.exports = router;
