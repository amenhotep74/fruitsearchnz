const db = require("../models");
const Tutorial = db.tutorials;

const fs = require("fs");
const csv = require("fast-csv");
const CsvParser = require("json2csv").Parser;

// UPLOAD CSV
const upload = async (req, res) => {
  let errors = "";
  let successmsg = "";
  try {
    if (req.file == undefined) {
      errors = "Please upload a CSV file!";
      return res.render("uploadspecies", { msg: errors });
      // return res.status(400).send("Please upload a CSV file!");
    }

    let tutorials = [];
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        // throw error.message;
        return res.render("uploadspecies", { msg: error });
      })
      .on("data", (row) => {
        tutorials.push(row);
      })
      .on("end", () => {
        db.Specie.bulkCreate(tutorials)
          .then(() => {
            // res.status(200).send({
            //   message:
            //     "Uploaded the file successfully: " + req.file.originalname,
            // });
            // IF SUCCESS
            successmsg = "Uploaded the file successfully!";
            return res.render("uploadspecies", { successmsg: successmsg });
          })
          .catch((error) => {
            // res.status(500).send({
            //   message: "Fail to import data into database!",
            //   error: error.message,
            // });
            error = "Failed to import data into database!";
            return res.render("uploadspecies", { msg: error });
          });
      });
  } catch (error) {
    console.log(error);
    // res.status(500).send({
    //   message: "Could not upload the file: " + req.file.originalname,
    // });
    return res.render("uploadspecies", { msg: error });
  }
};

// UPLOAD CSV
const uploadvarietys = async (req, res) => {
  let errors = "";
  let successmsg = "";
  try {
    if (req.file == undefined) {
      errors = "Please upload a CSV file!";
      return res.render("uploadvarietys", { msg: errors });
      // return res.status(400).send("Please upload a CSV file!");
    }

    let tutorials = [];
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        // throw error.message;
        return res.render("uploadvarietys", { msg: error });
      })
      .on("data", (row) => {
        tutorials.push(row);
      })
      .on("end", () => {
        db.Variety.bulkCreate(tutorials)
          .then(() => {
            // res.status(200).send({
            //   message:
            //     "Uploaded the file successfully: " + req.file.originalname,
            // });
            // IF SUCCESS
            successmsg = "Uploaded the file successfully!";
            return res.render("uploadvarietys", { successmsg: successmsg });
          })
          .catch((error) => {
            // res.status(500).send({
            //   message: "Fail to import data into database!",
            //   error: error.message,
            // });
            error = "Failed to import data into database!";
            return res.render("uploadvarietys", { msg: error });
          });
      });
  } catch (error) {
    console.log(error);
    // res.status(500).send({
    //   message: "Could not upload the file: " + req.file.originalname,
    // });
    return res.render("uploadvarietys", { msg: error });
  }
};

// UPLOAD CSV
const uploadlocations = async (req, res) => {
  let errors = "";
  let successmsg = "";
  try {
    if (req.file == undefined) {
      errors = "Please upload a CSV file!";
      return res.render("uploadlocations", { msg: errors });
      // return res.status(400).send("Please upload a CSV file!");
    }

    let tutorials = [];
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        // throw error.message;
        return res.render("uploadlocations", { msg: error });
      })
      .on("data", (row) => {
        tutorials.push(row);
      })
      .on("end", () => {
        db.Location.bulkCreate(tutorials)
          .then(() => {
            // res.status(200).send({
            //   message:
            //     "Uploaded the file successfully: " + req.file.originalname,
            // });
            // IF SUCCESS
            successmsg = "Uploaded the file successfully!";
            return res.render("uploadlocations", { successmsg: successmsg });
          })
          .catch((error) => {
            // res.status(500).send({
            //   message: "Fail to import data into database!",
            //   error: error.message,
            // });
            error = "Failed to import data into database!";
            return res.render("uploadlocations", { msg: error });
          });
      });
  } catch (error) {
    console.log(error);
    // res.status(500).send({
    //   message: "Could not upload the file: " + req.file.originalname,
    // });
    return res.render("uploadlocations", { msg: error });
  }
};

// UPLOAD CSV
const uploadplants = async (req, res) => {
  let errors = "";
  let successmsg = "";
  try {
    if (req.file == undefined) {
      errors = "Please upload a CSV file!";
      return res.render("uploadplants", { msg: errors });
      // return res.status(400).send("Please upload a CSV file!");
    }

    let tutorials = [];
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        // throw error.message;
        return res.render("uploadplants", { msg: error });
      })
      .on("data", (row) => {
        tutorials.push(row);
      })
      .on("end", () => {
        db.Plant.bulkCreate(tutorials)
          .then(() => {
            // res.status(200).send({
            //   message:
            //     "Uploaded the file successfully: " + req.file.originalname,
            // });
            // IF SUCCESS
            successmsg = "Uploaded the file successfully!";
            return res.render("uploadplants", { successmsg: successmsg });
          })
          .catch((error) => {
            // res.status(500).send({
            //   message: "Fail to import data into database!",
            //   error: error.message,
            // });
            error = "Failed to import data into database!";
            return res.render("uploadplants", { msg: error });
          });
      });
  } catch (error) {
    console.log(error);
    // res.status(500).send({
    //   message: "Could not upload the file: " + req.file.originalname,
    // });
    return res.render("uploadplants", { msg: error });
  }
};

const getTutorials = (req, res) => {
  Tutorial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

const download = (req, res) => {
  Tutorial.findAll().then((objs) => {
    let tutorials = [];

    objs.forEach((obj) => {
      const { id, title, description, published } = obj;
      tutorials.push({ id, title, description, published });
    });

    const csvFields = ["Id", "Title", "Description", "Published"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(tutorials);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");

    res.status(200).end(csvData);
  });
};

module.exports = {
  upload,
  uploadvarietys,
  uploadlocations,
  uploadplants,
  getTutorials,
  download,
};
