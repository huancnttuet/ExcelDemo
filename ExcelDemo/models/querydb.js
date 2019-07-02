const excelToJson = require("convert-excel-to-json");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("demodb", "root", "12345678", {
  dialect: "mysql",
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

  var promise = sequelize.query("set FOREIGN_KEY_CHECKS=0");
  const Method = sequelize.define("method", {
    name_method: {
      type: Sequelize.STRING
    }
  });

  const Property = sequelize.define("property", {
    type: {
      type: Sequelize.STRING
    }
  });

  const Rule = sequelize.define("rule", {
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
      type: Sequelize.INTEGER
    },
    methodId: {
      type: Sequelize.INTEGER
    }
  });


var querydb = {
  import: filename => {
    const result = excelToJson({
      sourceFile: filename,
      header: {
        rows: 2
      },
      sheets: [
        {
          name: "Summary of EOR",
          columnToKey: {
            A: "SN",
            B: "EOR_Method",
            C: "projects",
            D: "Gravity",
            E: "viscosity",
            F: "porosity",
            G: "Oil_Saturation",
            H: "Formation_Type",
            I: "Permeability",
            J: "Net_Thinkness",
            K: "Depth",
            L: "Temperature"
          }
        }
      ]
    });

    // eslint-disable-next-line no-array-constructor
    var property = new Array(
      {
        type: "Gravity"
      },
      {
        type: "viscosity"
      },
      {
        type: "porosity"
      },
      {
        type: "Oil_Saturation"
      },
      {
        type: "Formation_Type"
      },
      {
        type: "Permeability"
      },
      {
        type: "Net_Thinkness"
      },
      {
        type: "Depth"
      },
      {
        type: "Temperature"
      }
    );

    var method = new Array();

    result["Summary of EOR"].forEach(function(element, index) {
      method[index] = {
        name_method: element["EOR_Method"]
      };
    });

    // console.log(method);

    var rules = new Array();

        var b = (element + "").split("-", 2)[1];
        return Math.min(a, b);
      } else return "";
    }
    function max(element) {
      if (element + "" != "") {
        var a = (element + "").split("-", 2)[0];
        var b = (element + "").split("-", 2)[1];
        return Math.max(a, b);
      } else return "";
    }

    result["Summary of EOR"].forEach(function(element, index) {
      rules.push({
        methodId: index + 1,
        min: min(element["Gravity"]),
        max: max(element["Gravity"]),
        info: element["Gravity"]
      });
      rules.push({
        propertyId: 2,
        methodId: index + 1,
        min: min(element["viscosity"]),
        max: max(element["viscosity"]),
        info: element["viscosity"]
      });
      rules.push({
        propertyId: 3,
        methodId: index + 1,
        propertyId: 4,
        methodId: index + 1,
        min: min(element["Oil_Saturation"]),
        info: element["Oil_Saturation"]
      });
      rules.push({
        propertyId: 5,
        methodId: index + 1,
        min: 0,
        max: 0,
        propertyId: 6,
        min: min(element["Permeability"]),
        max: max(element["Permeability"]),
        info: element["Permeability"]
      });
      rules.push({
        propertyId: 7,
        methodId: index + 1,
        min: 0,
        max: 0,
        propertyId: 8,
        propertyId: 9,
        methodId: index + 1,
              ck.forEach(function(element3, index3) {
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
        return "notfound";
      }
    });
    return end;
  },
  getTable: async () => {
    return await Method.findAll(
      {
        attributes: ['name_method'],
        raw: true
      }
    ).map((key) => {
      return key.name_method;
    })
  },
  getRule: async () => {
      {
        attributes: ['info','methodId','propertyId'],
        raw: true
      }
    ).map(key => {
      return [key.methodId, key.propertyId, key.info]
    })
  }
};

module.exports = querydb;
