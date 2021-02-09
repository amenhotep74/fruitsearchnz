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
      },
      include: [{ model: db.Specie, attributes: ["name"] }],
    })
      .then((data) => {
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
      },
    })
      .then((data) => {
        console.log(data);
        // Grab specie ID
        console.log(data[0].dataValues.specieID);
        const searchID = data[0].dataValues.specieID;
        console.log(searchID);

        // FIND ALL VARIETIES THAT HAVE SPECIE ID AS FOREIGN KEY
        db.Variety.findAll({
          where: {
            SpecieSpecieID: searchID,
          },
        })
          .then((dataa) => {
            console.log("Found varieties", dataa[0].dataValues);
            // Render data
            res.render("searchdb", {
              layout: "main",
              dataa: dataa,
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

    // db.Variety.findAll({
    //   where: {
    //     name: { [Op.like]: "%" + req.body.searchfield + "%" },
    //   },
    //   include: [{ model: db.Specie, attributes: ["name"] }],
    // })
    //   .then((data) => {
    //     console.log("data", data[0].dataValues.Specie.dataValues);
    //     // Search species ID to retrieve species name

    //     // Re Render with that data
    //     res.render("searchdb", {
    //       layout: "main",
    //       data: data,
    //       varietyshow: true,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // db.Specie.findAll({
    //   where: {
    //     name: { [Op.like]: "%" + req.body.searchfield + "%" },
    //   },
    //   include: [
    //     {
    //       model: db.Variety,
    //       attributes: ["varietyID", "name", "characteristics"],
    //     },
    //   ],
    // })
    //   .then((data) => {
    //     // Search species ID to retrieve species name
    //     console.log("data", data[0].Varieties[0].dataValues);

    //     // Retrieve name from this
    //     console.log("Specie data", data[0].dataValues);
    //     // Re Render with that data
    //     res.render("searchdb", {
    //       layout: "main",
    //       data: data,
    //       speciesshow: true,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
});

module.exports = router;
