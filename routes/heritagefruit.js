const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");
const { Op, col, fn } = require("sequelize");

//  HERITAGE FRUIT DISPLAY
router.get("/", async (req, res, next) => {
  console.log("Route HIT");

  // Fetch species
  db.Specie.findAll({
    subQuery: false,
    attributes: {
      include: [[fn("COUNT", col("varieties.SpecieSpecieID")), "varietyCount"]],
    },
    include: [{ model: db.Variety, attributes: [] }],
    group: ["Specie.specieID"],
  })
    .then((data) => {
      // count records
      console.log(data);

      // Fetch and count varieties
      db.Variety.findAll({
        subQuery: false,
        attributes: {
          include: [[fn("COUNT", col("plants.VarietyVarietyID")), "treeCount"]],
        },
        include: [{ model: db.Plant, attributes: [] }],
        group: ["variety.varietyID"],
      })
        .then((dataVariety) => {
          console.log(dataVariety);
          res.render("heritagefruit", { data: data, dataVariety: dataVariety });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  // db.Specie.findAll({
  //   subQuery: false,
  //   attributes: {
  //     include: [[fn("COUNT", col("varieties.SpecieSpecieID")), "varietyCount"]],
  //   },
  //   include: [{ model: db.Variety, attributes: [] }],
  //   group: ["Specie.specieID"],
  // })
  //   .then((data) => {
  //     // count records
  //     console.log(data);
  //     res.render("heritagefruit", { data: data });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

module.exports = router;
