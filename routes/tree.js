const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");

router.post("/create", reqAuthentication, async (req, res, next) => {
  // Pull data from inputs
  console.log(req.body);

  console.log(req.body.variety);
  const varietyname = req.body.variety;

  // // Find Variety ID from variety value
  db.Variety.findAll({
    where: {
      name: varietyname,
    },
  })
    .then((datavariety) => {
      console.log("THIS VARIETY: ", datavariety);
      const varietyID = datavariety[0].dataValues.varietyID;
      console.log("VarietyID datavalues: ", varietyID);
      const address = req.body.locationaddress.toLowerCase();
      // FIND LOCATION ID WHERE PLANT ADDRESS = LOCATION ADDRESS
      db.Location.findAll({
        where: {
          address: address,
        },
      })
        .then((location) => {
          console.log(location);
          const locationID = location[0].dataValues.locationID;

          // PULL USER FROM COOKIES
          const token = req.cookies.jwt;
          jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
              console.log("There is no token error: ", err.message);
              res.redirect("/login");
            } else {
              // IF VERIFY SUCCESS ALLOW USER TO VISIT PARTICULAR ROUTE
              console.log("decoded token", decodedToken);
              const finalToken = decodedToken;
              // Search DB with final Token.
              console.log("FINAL TOKEN", finalToken.id);
              console.log("VarietyID", varietyID);
              console.log("LocationID", locationID);
              const userID = finalToken.id;

              // Success create tree
              db.Plant.create({
                locationaddress: req.body.locationaddress,
                locationname: req.body.locationname,
                gpslat: req.body.gpslat,
                gpslong: req.body.gpslong,
                notes: req.body.notes,
                height: req.body.height,
                trunkdiameter: req.body.diameter,
                blossomdate: req.body.blossomdate,
                diseases: req.body.diseases,
                age: req.body.age,
                VarietyVarietyID: varietyID,
                LocationLocationID: locationID,
                OwnerOwnerID: userID,
              })
                .then((data) => {
                  console.log(data);
                  res.redirect("/");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
