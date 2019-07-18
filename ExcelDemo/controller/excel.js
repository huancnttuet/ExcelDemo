const data = require("../models/excel");
const fs = require("fs");
const testFolder = "./uploads/";

module.exports = {
  selectedFile: async path => {
    await data.delete3Table();
    path = "uploads/" + path;
    var result = await data.import(path);
    if (result === 1) {
      return { message: "success" };
    }
  },
  process: async input_data => {
    var result = await data.findMethod(input_data);
    //lấy phần tử đầu tiên
    if (result.constructor === Array) {
      return { nameMethod: result[0] };
    }
    return { nameMethod: result };
  },
  getListData: callback => {
    //callback thật sự khó hiểu
    fs.readdir(testFolder, (err, files) => {
      if (err) return callback(err);
      callback(null, files);
    });
  },
  getTable: async () => {
    const sortFunction = (a, b) => {
      if (a[0] === b[0]) {
        if (a[1] === b[1]) {
          return 0;
        } else {
          return a[1] > b[1] ? 1 : -1;
        }
      } else {
        return a[0] > b[0] ? 1 : -1;
      }
    };

    var tss = await data.getTable();

    var ts = await data.getRule();
    ts.sort(sortFunction);
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var arr4 = [];
    var arr5 = [];
    var arr6 = [];
    var arr7 = [];
    var arr8 = [];
    var arr9 = [];

    ts.map(value => {
      if (value[1] === 1) {
        arr1.push(value[2]);
      }
      if (value[1] === 2) {
        arr2.push(value[2]);
      }
      if (value[1] === 3) {
        arr3.push(value[2]);
      }
      if (value[1] === 4) {
        arr4.push(value[2]);
      }
      if (value[1] === 5) {
        arr5.push(value[2]);
      }
      if (value[1] === 6) {
        arr6.push(value[2]);
      }
      if (value[1] === 7) {
        arr7.push(value[2]);
      }
      if (value[1] === 8) {
        arr8.push(value[2]);
      }
      if (value[1] === 9) {
        arr9.push(value[2]);
      }
    });
    return {
      name_method: tss,
      gravity: arr1,
      viscosity: arr2,
      porosity: arr3,
      oil_saturation: arr4,
      formation_type: arr5,
      permeability: arr6,
      net_thinkness: arr7,
      depth: arr8,
      temperature: arr9
    };
  }
};
