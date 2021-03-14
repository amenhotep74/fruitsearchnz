const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");

router.post(
  "/create",
  check("locationaddress", "Address is required").not().isEmpty(),
  check("locationname", "Address is required").not().isEmpty(),
  check("variety", "Variety is required").not().isEmpty(),
  check("height", "Height must be a number and not empty.")
    .not()
    .isEmpty()
    .isFloat(),
  check("height", "Diameter must be a number and not empty.")
    .not()
    .isEmpty()
    .isFloat(),
  check("blossomdate", "Blossom Date must not empty.").not().isEmpty(),
  check("age", "Age must be a number and not empty.").not().isEmpty().isFloat(),
  reqAuthentication,
  async (req, res, next) => {
    const validationErrors = validationResult(req);
    let errors = "";
    if (!validationErrors.isEmpty()) {
      // console.log("validation errors", validationErrors);
      return res.render("treeregister", {
        validationErrors: validationErrors.array(),
      });
    }

    // Pull data from inputs
    console.log(req.body);

    console.log(req.body.variety);
    const varietyname = req.body.variety;

    // // Find Variety ID from variety value
    db.Variety.findAll({
      where: {
        name: varietyname,
        isApproved: 1,
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
            console.log("LOCATION", location);
            const locationID = location[0].dataValues.locationID;

            // PULL USER FROM COOKIES
            const token = req.cookies.jwt;
            jwt.verify(
              token,
              process.env.JWT_SECRET_KEY,
              (err, decodedToken) => {
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
                    type: req.body.type,
                    rootstock: req.body.rootstock,
                    public: req.body.public,
                    synonyms: req.body.synonyms,
                    identitycertain: req.body.identitycertain,
                    fruitripedate: req.body.fruitripedate,
                    maintainedneglected: req.body.maintainedneglected,
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
              }
            );
          })
          .catch((err) => {
            console.log(err);
            errors = "Location address chould not be found, try again.";
            return res.render("treeregister", { msg: errors });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

module.exports = router;
