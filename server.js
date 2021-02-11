const express = require("express");
const cors = require("cors");
const exphbs = require("express-handlebars");
require("dotenv").config();
const app = express();
const db = require("./models");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const {
  reqAuthentication,
  notReqAuthentication,
  checkAuthentication,
} = require("./config/auth");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// app.use(cors());
// parse requests of content-type - application/json

// parse requests of content-type - application/x-www-form-urlencode
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "hbs");

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

db.sequelize.sync();

//CHECK AUTH INSIDE OUR VIEW ENGINE
app.get("*", checkAuthentication);

// Define Routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/species", require("./routes/species"));
app.use("/variety", require("./routes/variety"));
app.use("/search", require("./routes/search"));
app.use("/adminactions", require("./routes/adminactions"));

// Page Routers
app.get("/", (req, res, next) => {
  res.render("home", { layout: "main" });
});
app.get("/register", notReqAuthentication, (req, res, next) => {
  res.render("register", { layout: "main" });
});
app.get("/login", notReqAuthentication, (req, res, next) => {
  res.render("login", { layout: "main" });
});
app.get("/searchdb", (req, res, next) => {
  res.render("searchdb", { layout: "main" });
});
app.get("/addvariety", reqAuthentication, (req, res, next) => {
  // Query species from database to display in select dropdown
  db.Specie.findAll({
    attributes: ["name", "specieID"],
  })
    .then((data) => {
      console.log(data);
      res.render("addvariety", { layout: "main", species: data });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/addspecies", reqAuthentication, (req, res, next) => {
  res.render("addspecies", { layout: "main" });
});
app.get("/treeregister", reqAuthentication, (req, res, next) => {
  res.render("treeregister", { layout: "main" });
});
app.get("/dashboard", reqAuthentication, async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedUser) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        // User.findById(decodedUser.id, (err, docs) => {
        //   const user = docs.name;
        //   res.render("dashboard", { user });
        // });

        const searchId = decodedUser.id;
        console.log("searchId", searchId);
        db.User.findByPk(searchId)
          .then((docs) => {
            console.log("docs.dv.id:", docs.dataValues.username);
            const user = docs.dataValues.username;
            console.log("user: ", user);
            // if user is not admin redirect
            if (!docs.dataValues.isAdmin) {
              res.redirect("/");
            } else {
              // Query database for Varieties that have been submitted, that have not been approved.
              db.Variety.findAll({
                where: {
                  isApproved: null,
                },
              })
                .then((data) => {
                  // Format Date
                  console.log("data", data);
                  res.render("dashboard", { layout: "main", data, user });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  } else {
    const user = "Unknown";
    res.render("dashboard", { user });
  }
});

app.get("/dashboard/viewowners", reqAuthentication, async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedUser) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        // User.findById(decodedUser.id, (err, docs) => {
        //   const user = docs.name;
        //   res.render("dashboard", { user });
        // });

        const searchId = decodedUser.id;
        console.log("searchId", searchId);
        db.User.findByPk(searchId)
          .then((docs) => {
            console.log("docs.dv.id:", docs.dataValues.username);
            const user = docs.dataValues.username;
            console.log("user: ", user);
            // if user is not admin redirect
            if (!docs.dataValues.isAdmin) {
              res.redirect("/");
            } else {
              res.render("viewowners", { layout: "main", user });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  } else {
    const user = "Unknown";
    res.render("viewowners", { user });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`> Server is running on port ${PORT}`);
});
