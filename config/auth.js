const jwt = require("jsonwebtoken");
// Require DB
const db = require("../models");

const reqAuthentication = (req, res, next) => {
  // GETTING TOKEN FROM BROWSER
  const token = req.cookies.jwt;
  // VERIFYING USER - IF USER PASS THEN USER ABLE TO VISIT PARTICLUR ROUTE
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    // FAIELD TO VERIFY TOKEN USER NEED TO LOGIN TO CREATE NEW ACCESS TOKEN
    if (err) {
      console.log("There is no token error: ", err.message);
      res.redirect("/login");
    } else {
      // IF VERIFY SUCCESS ALLOW USER TO VISIT PARTICULAR ROUTE
      console.log("decoded token", decodedToken);
      next();
    }
  });
};

// IF USER IS LOGGED IN THEY CAN'T GO TO LOGIN OR REGESTRATION PAGE
const notReqAuthentication = (req, res, next) => {
  // VERIFYING USER
  const token = req.cookies.jwt;
  // IF THERE IS A TOKEN NAME WITH JWT THEN IT IT WON'T LET USER GO SOME ROUTE
  if (token) {
    console.log("There is an token");
    res.redirect("/");
  } else {
    // IF THERE IS NO TOKEN THEN USER ALLOW TO VISIT CERTAIN ROUTE
    console.log("There is no token ");
    next();
  }
};

// BY USING THIS WE CAN CHECK LOG IN OR NOT INSIDE OUR VIEW ENGINE
const checkAuthentication = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        // IF THERE IS A TOKEN BUT UNVERIFIED SETTING USER VARIABLE AS NULL
        res.locals.user = null;
        next();
      } else {
        console.log("Decoded Token: ", decodedToken);

        const findbyId = decodedToken.id;
        db.User.findByPk(findbyId)
          .then((docs) => {
            // console.log("checkauthdocs:", docs.dataValues);

            // Variables to access inside handlebars
            res.locals.user = docs.dataValues;
            res.locals.id = docs.dataValues.id;
            res.locals.username = docs.dataValues.username;
            res.locals.email = docs.dataValues.email;
            res.locals.isAdmin = docs.dataValues.isAdmin;
            res.locals.isSuperuser = docs.dataValues.isSuperuser;
            next();
          })
          .catch((err) => {
            console.log(err);
            next();
          });

        // // Find User by pk id
        // db.User.findByPk(decodedToken.id, (error, docs) => {
        //   if (error) {
        //     console.log(error);
        //     next();
        //   } else {
        //     // IF THERE IS A TOKEN AND VERIFIED IT WILL SET A USER VARIABLE AND ALLOW VIEW ENGINE TO USE THIS VARIABLE
        //     res.locals.user = docs;
        //     next();
        //   }
        // });
      }
    });
  } else {
    // IF THERE IS NO TOKEN SETTING USER VARIABLE AS NULL
    res.locals.user = null;
    next();
  }
};

module.exports = {
  checkAuthentication,
  reqAuthentication,
  notReqAuthentication,
};
