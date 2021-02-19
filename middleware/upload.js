const multer = require("multer");

const csvFilter = (req, file, cb) => {
  console.log("CSVFILTER", file);
  if (file.mimetype == "application/vnd.ms-excel") {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: csvFilter });

module.exports = uploadFile;
