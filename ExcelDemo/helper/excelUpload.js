var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var excelFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(xls|xlsx|xlsm)$/)) {
    return cb(new Error("Only excel file are allowed!"), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: excelFilter });
var excelUpload = upload.single("foo");

module.exports = excelUpload;
