const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");
const { Op } = require("sequelize");

// @route POST /search
// @desc SEARCH
// @access Public
router.post("/submit", async (req, res) => {
  // Pull value from input to search with
  console.log(req.body.searchfield);
  console.log("req body:", req.body);

  // Determine which radio button was pressed.
  if (req.body.exampleRadios == "variety") {
    console.log("VARIETY SELECTED");
    db.Variety.findAll({
      where: {
        name: { [Op.like]: "%" + req.body.searchfield + "%" },
        isApproved: 1,
      },
      include: [{ model: db.Specie, attributes: ["name"] }],
    })
      .then((data) => {
        // if data empty array
        if (data.length === 0) {
          return res.render("searchdb", {
            nodata: "No data found, try again.",
            varietyshow: true,
          });
        }

        console.log("data", data[0].dataValues.Specie.dataValues);
        // Search species ID to retrieve species name

        // Re Render with that data
        res.render("searchdb", {
          layout: "main",
          data: data,
          varietyshow: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (req.body.exampleRadios == "species") {
    console.log("species SELECTED");
    // Search in varieties with foreign key?

    // Find ID of specie where searchfield is most like
    db.Specie.findAll({
      where: {
        name: { [Op.like]: "%" + req.body.searchfield + "%" },
        isApproved: 1,
      },
    })
      .then((data) => {
        console.log(data.dataValues);
        // if data empty array

        if (data.length === 0) {
          console.log("IF NO DATA TRIGGERED");
          return res.render("searchdb", {
            nodata: "No data found, try again.",
            speciesshow: true,
          });
        }

        console.log(data);
        // Grab specie ID
        console.log(data[0].dataValues.specieID);
        const searchID = data[0].dataValues.specieID;
        console.log("search ID", searchID);

        const speciesName = data[0].dataValues.name;

        // FIND ALL VARIETIES THAT HAVE SPECIE ID AS FOREIGN KEY
        db.Variety.findAll({
          where: {
            SpecieSpecieID: searchID,
            isApproved: 1,
          },
        })
          .then((dataa) => {
            console.log("dataa", dataa);
            console.log("Found varieties", dataa[0].dataValues);
            console.log("dataaaaaa", data[0].dataValues.name);
            // Join data and dataa together
            // Render data
            return res.render("searchdb", {
              layout: "main",
              dataa: dataa,
              data: data[0].dataValues,
              speciesname: speciesName,
              speciesshow: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

module.exports = router;
