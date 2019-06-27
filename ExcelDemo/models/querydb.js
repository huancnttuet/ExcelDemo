var querydb = {
  import: (filename) => {

    const excelToJson = require('convert-excel-to-json');
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('demodb', 'root', '12345678', {
      dialect: 'mysql',
      logging: false
    });

    const result = excelToJson({
      sourceFile: filename,
      header: {
        rows: 2
      },
      sheets: [{
        name: 'Summary of EOR',
        columnToKey: {
          A: 'SN',
          B: 'EOR_Method',
          C: 'projects',
          D: 'Gravity',
          E: 'viscosity',
          F: 'porosity',
          G: 'Oil_Saturation',
          H: 'Formation_Type',
          I: 'Permeability',
          J: 'Net_Thinkness',
          K: 'Depth',
          L: 'Temperature'
        }
      }]

    });


    var property = new Array({
      type: 'Gravity'
    }, {
        type: 'viscosity'
      }, {
        type: 'porosity'
      }, {
        type: 'Oil_Saturation'
      }, {
        type: 'Formation_Type'
      }, {
        type: 'Permeability'
      }, {
        type: 'Net_Thinkness'
      }, {
        type: 'Depth'
      }, {
        type: 'Temperature'
      });

    var method = new Array();




    result['Summary of EOR'].forEach(function (element, index) {
      method[index] = {
        name_method: element['EOR_Method']
      };
    });

    // console.log(method);

    var rules = new Array();

    function min(element) {
      if (element + '' != '') {
        var a = (element + '').split('-', 2)[0];
        var b = (element + '').split('-', 2)[1];
        return Math.min(a, b);
      }
      else return '';
    }
    function max(element) {
      if (element + '' != '') {
        var a = (element + '').split('-', 2)[0];
        var b = (element + '').split('-', 2)[1];
        return Math.max(a, b);
      }
      else return '';
    }



    result['Summary of EOR'].forEach(function (element, index) {

      rules.push({
        propertyId: 1,
        methodId: index + 1,
        min: min(element['Gravity']),
        max: max(element['Gravity']),
        info: element['Gravity']
      });
      rules.push({
        propertyId: 2,
        methodId: index + 1,
        min: min(element['viscosity']),
        max: max(element['viscosity']),
        info: element['viscosity']
      });
      rules.push({
        propertyId: 3,
        methodId: index + 1,
        min: min(element['porosity']),
        max: max(element['porosity']),
        info: element['porosity']
      });
      rules.push({
        propertyId: 4,
        methodId: index + 1,
        min: min(element['Oil_Saturation']),
        max: max(element['Oil_Saturation']),
        info: element['Oil_Saturation']
      });
      rules.push({
        propertyId: 5,
        methodId: index + 1,
        min: 0,
        max: 0,
        info: element['Formation_Type']
      });
      rules.push({
        propertyId: 6,
        methodId: index + 1,
        min: min(element['Permeability']),
        max: max(element['Permeability']),
        info: element['Permeability']
      });
      rules.push({
        propertyId: 7,
        methodId: index + 1,
        min: 0,
        max: 0,
        info: element['Net_Thinkness']
      });
      rules.push({
        propertyId: 8,
        methodId: index + 1,
        min: min(element['Depth']),
        max: max(element['Depth']),
        info: element['Depth']
      });
      rules.push({
        propertyId: 9,
        methodId: index + 1,
        min: min(element['Temperature']),
        max: max(element['Temperature']),
        info: element['Temperature']
      });
    });

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
    var promise = sequelize.query("set FOREIGN_KEY_CHECKS=0");
    const Method = sequelize.define('method', {
      name_method: {
        type: Sequelize.STRING
      }
    });

    const Property = sequelize.define('property', {
      type: {
        type: Sequelize.STRING
      }
    });

    const Rule = sequelize.define('rule', {
      min: {
        type: Sequelize.DOUBLE
      },
      max: {
        type: Sequelize.DOUBLE
      },
      info: {
        type: Sequelize.STRING
      },
      propertyId: {
        type: Sequelize.INTEGER,
      },
      methodId: {
        type: Sequelize.INTEGER,
      },
      tableId: {
        type: Sequelize.INTEGER,
      },
    });


    var kq1 = new Promise(function (resolve, reject) {
      Method.sync({ force: true }).then(() => {
        // Table created
        method.forEach(function (element, index) {
          // statements
          return Method.create(element).then((aaa) => {
            if (aaa['dataValues']['id'] == method.length) {
              console.log("Method success!");
              resolve(1);
            }
          });
        });
      });
    });
    var kq2 = new Promise(function (resolve, reject) {
      Property.sync({ force: true }).then(() => {
        // Table created
        property.forEach(function (element, index) {
          // statements
          return Property.create(element).then((aaa) => {
            if (aaa['dataValues']['id'] == property.length) {
              console.log('Property success');
              resolve(1);
            }
          });
        });
      });

    });

    var kq3 = new Promise(function (resolve, reject) {

      Rule.sync({ force: true }).then(() => {
        // Table created
        rules.forEach(function (element, index) {
          // statements
          Rule.create(element).then((aaa) => {
            if (aaa['dataValues']['id'] == rules.length) {
              console.log("Rules success");
              resolve(1);
            }
          });
        });

      });
    });

    var kq = new Promise(function (resolve, reject) {
      kq1.then((a) => {
        if (a == 1) {
          kq2.then((b) => {
            if (b == 1) {
              kq3.then((c) => {
                if (c == 1) {
                  resolve(1);
                } else {
                  resolve(0);
                }
              })
            } else {
              resolve(0);
            }
          })
        } else {
          resolve(0);
        }
      })
    });

    return kq;

  },
  findMethod: (input_data) => {
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('demodb', 'root', '12345678', {
      dialect: 'mysql',
      logging: false                                                                                                 
    });
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });

    var ck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    var promise = new Promise(function (resolve, reject) {

    });
    var kq = new Promise(function (resolve, reject) {

    });
    var ft = input_data[4];
    var nt = input_data[6];

    switch (ft) {
      case 1:
        var fmt = 'Sandstone or carbonate';
        break;
      case 2:
        var fmt = 'Sandstone';
        break;
      case 3:
        var fmt = 'Sandstone or carbonate [Preferably Carbonate]';
        break;
      default:
        var fmt = '';
        break;
    }

    switch (nt) {
      case 1:
        var net = '[Wide Range]';
        break;
      case 2:
        var net = '[Thin unless dipping]';
        break;
      case 3:
        var net = 'NC';
        break;
      case 4:
        var net = '[>10]';
        break;
      case 5:
        var net = '[>20]';
        break;
      default:
        var net = '';
        break;
    }
    var aft = new Array();
    var anet = new Array();
    var pft = sequelize.query("SELECT * FROM rules WHERE info =?",
      { replacements: [fmt], type: sequelize.QueryTypes.SELECT }).then(result => {
        result.forEach((e, i) => {
          aft.push(e['methodId']);
        });
        return aft;
      });
    if (net == '') {
      var pnet = sequelize.query("SELECT * FROM rules WHERE info is NULL",
        { replacements: [net], type: sequelize.QueryTypes.SELECT }).then(result => {
          result.forEach((e, i) => {
            anet.push(e['methodId']);
          });
          return anet;
        });
    } else {
      var pnet = sequelize.query("SELECT * FROM rules WHERE info =?",
        { replacements: [net], type: sequelize.QueryTypes.SELECT }).then(result => {
          result.forEach((e, i) => {
            anet.push(e['methodId']);
          });
          return anet;
        });
    }

    input_data.forEach(function (element, index) {
      // statements
      promise = sequelize.query('SELECT * FROM rules WHERE propertyId = ?',
        { replacements: [index + 1], type: sequelize.QueryTypes.SELECT }
      ).then(result => {
        result.forEach(function (element2, index2) {
          // statements
          if (element2['min'] < element && element2['max'] > element || index == 4 || index == 6) {

          }
          else {
            ck.forEach(function (element3, index3) {
              if (element3 == element2['methodId']) {
                ck.splice(index3, 1);

              }
            });
          }
        });
        if (index == 8) {
          return ck;
        }
      });
    });
    var ss = new Array();
    var output = new Array();
    var end = Promise.all([pft, pnet, promise]).then(values => {
      console.log(values);
      for (var i = 0; i < values[1].length; i++) {
        for (var j = 0; j < values[2].length; j++) {
          for (var k = 0; k < values[0].length; k++) {
            if (values[0][k] == values[2][j] && values[0][k] == values[1][i]) {
              ss.push(values[0][k]);
            }
          }
        }
      }
      console.log(ss.length);
      if (ss.length > 0) {
        ss.forEach(function (ele, ind) {
          kq = sequelize.query("SELECT * FROM methods WHERE id = ?",
            { replacements: [ele], type: sequelize.QueryTypes.SELECT }
          ).then(success => {
            output.push(success[0]['name_method']);
            if (ind + 1 == ss.length) {
              return output;
            }
          });
        });
        return kq;
      } else {
        return 'notfound'
      }
    });
    return end;
  }
}


module.exports = querydb;
