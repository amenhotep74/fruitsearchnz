const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");
const { Op } = require("sequelize");

// @route POST /owners/create
// @desc CREATE OWNER
// @access Public
router.post(
  "/create",
  [
    // validation
    check("name", "Name is required").not().isEmpty(),
    check("address", "Please include an Address.").not().isEmpty(),
    check("province", "Please select a province.").not().isEmpty(),
    check("website", "Please include a website.").not().isEmpty(),
    check("phone", "Please include a phone number.").not().isEmpty(),
  ],
  reqAuthentication,
  async (req, res) => {
    // pull user from browser
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      // FAIELD TO VERIFY TOKEN USER NEED TO LOGIN TO CREATE NEW ACCESS TOKEN
      if (err) {
        console.log("There is no token error: ", err.message);
        res.redirect("/login");
      } else {
        // IF VERIFY SUCCESS ALLOW USER TO VISIT PARTICULAR ROUTE
        console.log("decoded token", decodedToken);
        const finalToken = decodedToken;
        // Search DB with final Token.
        console.log("FINAL TOKEN", finalToken.id);
        // put address to lower case
        const address = req.body.address.toLowerCase();
        // Create record from formdata
        db.Owner.create({
          name: req.body.name,
          address: address,
          email: req.body.email,
          phone: req.body.phone,
          website: req.body.website,
          province: req.body.province,
          UserId: finalToken.id,
        })
          .then((data) => {
            const searchid = finalToken.id;
            console.log(data);
            // Set user to superuser once registered as owner
            db.User.update(
              {
                isSuperuser: 1,
              },
              {
                where: {
                  id: searchid,
                },
              }
            )
              .then((data) => {
                console.log(data);
                res.redirect("/");
              })
              .catch((err) => {
                console.log(err);
                res.redirect("/ownerregister");
              });
          })
          .catch((error) => {
            console.log(error);
            res.redirect("/ownerregister");
          });
      }
    });
  }
);
module.exports = router;
