const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");
// Require DB
const db = require("../models");
const { Op } = require("sequelize");

// @route POST /adminactions/getallvarietys
// @desc RETRIEVE ALL VARIETYS NOT CURRENTLY APPROVED
// @access Requires login
router.get("/getallvarietys", reqAuthentication, async (req, res, next) => {
  db.Variety.findAll({
    where: {
      isApproved: null,
    },
    include: [{ model: db.Specie, attributes: ["name"] }],
  })
    .then((data) => {
      // Format Date
      console.log("data", data);
      // res.render("dashboard", { layout: "main", data, user });
      // send back to frontend
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route POST /adminactions/getallvarietys
// @desc RETRIEVE ALL VARIETYS NOT CURRENTLY APPROVED
// @access Requires login
router.get("/getallspecies", reqAuthentication, async (req, res, next) => {
  db.Specie.findAll({
    where: {
      isApproved: null,
    },
  })
    .then((data) => {
      // Format Date
      console.log("data", data);
      // res.render("dashboard", { layout: "main", data, user });
      // send back to frontend
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route POST /adminactions/getallowners
// @desc RETRIEVE ALL THE OWNERS
// @access Requires login
router.get("/getallowners", reqAuthentication, async (req, res, next) => {
  db.Owner.findAll()
    .then((data) => {
      // Format Date
      console.log("data", data);
      // send back to frontend
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route POST /adminactions/getallowners
// @desc RETRIEVE ALL THE USERS
// @access Requires login
router.get("/getallusers", reqAuthentication, async (req, res, next) => {
  db.User.findAll()
    .then((data) => {
      // Format Date
      console.log("data", data);
      // send back to frontend
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route POST /adminactions/getalladmins
// @desc RETRIEVE ALL THE ADMINS
// @access Requires login
router.get("/getalladmins", reqAuthentication, async (req, res, next) => {
  db.User.findAll({
    where: {
      isAdmin: 1,
    },
  })
    .then((data) => {
      // Format Date
      console.log("data", data);
      // send back to frontend
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route POST /adminactions/promotetoadmin
// @desc PROMOTE USER TO ADMIN
// @access ADMIN ONLY
router.post("/promotetoadmin", reqAuthentication, async (req, res, next) => {
  db.User.update(
    { isAdmin: 1 },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route POST /adminactions/approve
// @desc APPROVE AN ID
// @access ADMIN ONLY
router.post("/approve", reqAuthentication, async (req, res, next) => {
  console.log(req.body.id);
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

// @route POST /adminactions/approve
// @desc APPROVE AN ID
// @access ADMIN ONLY
router.post("/species/approve", reqAuthentication, async (req, res, next) => {
  console.log(req.body.id);
  // pull id from request
  var id = req.body.id;
  // convert string to integer
  id = parseInt(id, 10);
  console.log(typeof id);
  console.log(id);

  // Modify isApproved to 1(true) where id is varietyID
  db.Specie.update(
    { isApproved: 1 },
    {
      where: {
        specieID: id,
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
router.post("/species/reject", reqAuthentication, async (req, res, next) => {
  // pull id from request
  var id = req.body.id;
  // convert string to integer
  id = parseInt(id, 10);
  console.log(typeof id);
  console.log("id", id);
  // Remove from database
  db.Specie.destroy({
    where: {
      specieID: id,
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
