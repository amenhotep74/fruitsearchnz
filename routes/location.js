const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");
const { Op } = require("sequelize");

router.post("/create", reqAuthentication, (req, res, next) => {
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
});

module.exports = router;
