const express = require("express");
const cors = require("cors");
const exphbs = require("express-handlebars");
require("dotenv").config();
const app = express();
const db = require("./models");
const jwt = require("jsonwebtoken");
const {
  reqAuthentication,
  notReqAuthentication,
  checkAuthentication,
} = require("./config/auth");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// app.use(cors());
// parse requests of content-type - application/json

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "hbs");

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
  })
);

db.sequelize.sync();

//CHECK AUTH INSIDE OUR VIEW ENGINE
app.get("*", checkAuthentication);

// Define Routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

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
            res.render("dashboard", { user });
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`> Server is running on port ${PORT}`);
});
