var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const excelRouter = require("./router/excel");
const userRouter = require("./router/user");

app.use("/", excelRouter);
app.use("/", userRouter);

app.listen(8000, function() {
  console.log("App running on port 8000");
});
