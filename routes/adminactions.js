const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");
const { Op } = require("sequelize");

// @route POST /adminactions/approve
// @desc APPROVE AN ID
// @access ADMIN ONLY
router.post("/approve", reqAuthentication, async (req, res, next) => {
  // pull id from request
  var id = req.body.id;
  // convert string to integer
  id = parseInt(id, 10);
  console.log(typeof id);
  console.log(id);

  // Modify isApproved to 1(true) where id is varietyID
  db.Variety.update(
    { isApproved: 1 },
    {
      where: {
        varietyID: id,
      },
    }
  )
    .then((data) => {
      console.log("Found Record", data);
      // Re render page
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route POST /adminactions/approve
// @desc APPROVE AN ID
// @access ADMIN ONLY
router.post("/reject", reqAuthentication, async (req, res, next) => {
  // pull id from request
  var id = req.body.id;
  // convert string to integer
  id = parseInt(id, 10);
  console.log(typeof id);
  console.log("id", id);
  // Remove from database
  db.Variety.destroy({
    where: {
      varietyID: id,
    },
  })
    .then((data) => {
      console.log(data);
      // Re render page
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
