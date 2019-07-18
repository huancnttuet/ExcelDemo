const express = require("express");

const excel_router = express.Router();

//import controller
var excel = require("../controller/excel.js");
var history = require("../controller/history");
//import helper
var excelUpload = require("../helper/excelUpload.js");

excel_router.post("/upload", (req, res) => {
  excelUpload(req, res, err => {
    if (err) {
      return res.json({ message: "must a file excel" });
    }
    var file = req.file;
    if (!file) {
      return res.json({ message: "please upload a file" });
    } else {
      res.json({ message: "success" });
    }
  });
});

excel_router.post("/selectFile", async (req, res) => {
  var selectedFile = req.body.filename;
  res.json(await excel.selectedFile(selectedFile));
});

excel_router.get("/process", async (req, res) => {
  console.log(req.query);
  var input_data = [
    parseFloat(req.query.gravity),
    parseFloat(req.query.viscosity),
    parseFloat(req.query.porosity),
    parseFloat(req.query.oil_saturation),
    parseFloat(req.query.formation_type),
    parseFloat(req.query.permeability),
    parseFloat(req.query.net_thinkness),
    parseFloat(req.query.depth),
    parseFloat(req.query.temperature)
  ];
  var result = await excel.process(input_data);
  console.log(result);
  //save history
  var kq = await history.createHistory(input_data, result);
  console.log(kq);
  res.json(result);
});

excel_router.get("/getListData", (req, res) => {
  excel.getListData((err, files) => {
    res.json({ files: files });
  });
});
excel_router.get("/getTable", async (req, res) => {
  res.json(await excel.getTable());
});

excel_router.get("/getTableHistory", async (req, res) => {
  res.json(await history.getHistory());
});

module.exports = excel_router;
