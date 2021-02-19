const express = require("express");
const router = express.Router();
const csvController = require("../controllers/csv.controller");
const upload = require("../middleware/upload");
const { reqAuthentication, notReqAuthentication } = require("../config/auth");

let routes = (app) => {
  router.post(
    "/upload",
    reqAuthentication,
    upload.single("file"),
    csvController.upload
  );
  router.get("/tutorials", reqAuthentication, csvController.getTutorials);

  router.get("/download", reqAuthentication, csvController.download);

  app.use("/api/csv", reqAuthentication, router);
};

module.exports = routes;
