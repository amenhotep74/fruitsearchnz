const express = require("express");
const cors = require("cors");
const exphbs = require("express-handlebars");
require("dotenv").config();
const app = express();
const db = require("./models");

// app.use(cors());
// parse requests of content-type - application/json

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "hbs");

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.use(express.static("public"));

db.sequelize.sync();

// Define Routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

// Page Routers
app.get("/", (req, res) => {
  res.render("home", { layout: "main" });
});
app.get("/register", (req, res) => {
  res.render("register", { layout: "main" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`> Server is running on port ${PORT}`);
});
