const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./models");

// app.use(cors());
// parse requests of content-type - application/json

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.sequelize.sync();

// Define Routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`> Server is running on port ${PORT}`);
});
