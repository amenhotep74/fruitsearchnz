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
  check("province", "Province is required").not().isEmpty(),

  reqAuthentication,
  (req, res, next) => {
    const validationErrors = validationResult(req);
    let errors = "";
    if (!validationErrors.isEmpty()) {
      // console.log("validation errors", validationErrors);
      return res.render("addvariety", {
        validationErrors: validationErrors.array(),
      });
    }

    console.log(req.body);
    // pull data from form inputs
    db.Location.create({
      name: req.body.name,
      address: req.body.address,
      province: req.body.province,
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
