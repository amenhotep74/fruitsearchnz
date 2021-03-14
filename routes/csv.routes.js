const express = require("express");
const router = express.Router();
const csvController = require("../controllers/csv.controller");
const upload = require("../middleware/upload");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");

let routes = (app) => {
  // SPECIES
  router.post("/upload", upload.single("file"), csvController.upload);
  // VARIETIES
  router.post(
    "/upload/varietys",
    upload.single("file"),
    csvController.uploadvarietys
  );
  // LOCATION
  router.post(
    "/upload/locations",
    upload.single("file"),
    csvController.uploadlocations
  );
  // PLANTS
  router.post(
    "/upload/plants",
    upload.single("file"),
    csvController.uploadplants
  );

  router.get("/tutorials", reqAuthentication, csvController.getTutorials);

  router.get("/download", reqAuthentication, csvController.download);

  app.use("/api/csv", router);
};

module.exports = routes;
