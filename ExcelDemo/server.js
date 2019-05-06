var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
const data = require('./models/querydb.js');
app.use(cors())

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
})

var excelFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(xls|xlsx|xlsm)$/)) {
    return cb(new Error('Only excel file are allowed!'), false);
  }
  cb(null, true);
}
var upload = multer({storage: storage, fileFilter: excelFilter});
var excelUpload = upload.single('foo');

app.post('/upload',function(req, res) {
  console.log(req.body);
  excelUpload(req, res, (err) => {
    if(err) {
      console.log(err);
      return res.json({message:'must a file excel'});
    }
    var file = req.file;
    if (!file) {
        return res.json({message: "please upload a file"});
    } else {
        var path = 'uploads/' + file.filename;
        console.log('upload success!');
        console.log(file);

        data.import(path).then((b)=>{
          if(b == 1){
            res.json({message: 'success'});
          } else {
            res.json({message: 'error'});
          }
        });
      }
  });

});

app.get('/process', (req, res) => {
  console.log(req.query);
  input_data = [
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
  data.findMethod(input_data).then(t => {

      console.log(t);
      res.json({nameMethod : t});


  })

});

app.listen(8000, function() {

    console.log('App running on port 8000');

});
