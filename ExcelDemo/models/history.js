const Sequelize = require("sequelize");
var sequelize = require("./configORM.js");

var History = sequelize.define("history", {
  gravity: Sequelize.INTEGER,
  viscosity: Sequelize.INTEGER,
  porosity: Sequelize.INTEGER,
  oil_saturation: Sequelize.INTEGER,
  formation_type: Sequelize.STRING,
  permeability: Sequelize.INTEGER,
  net_thinkness: Sequelize.INTEGER,
  depth: Sequelize.INTEGER,
  temperature: Sequelize.INTEGER,
  result: Sequelize.STRING,
  created_by: Sequelize.INTEGER,
  createdAt: {
    field: "created_at",
    type: Sequelize.DATE
  },
  updatedAt: {
    field: "updated_at",
    type: Sequelize.DATE
  }
});

module.exports = {
  createHistory: async (params, result, id) => {
    var createOne = await History.findOrCreate({
      where: {
        gravity: params[0],
        viscosity: params[1],
        porosity: params[2],
        oil_saturation: params[3],
        formation_type: params[4],
        permeability: params[5],
        net_thinkness: params[6],
        depth: params[7],
        temperature: params[8],
        result: result.nameMethod,
        created_by: id
      },
      defaults: {
        id: 0
      }
    });

    return createOne[1];
  },
  getTable: async () => {
    var result = await History.findAll({
      attributes: [
        "gravity",
        "viscosity",
        "porosity",
        "oil_saturation",
        "formation_type",
        "permeability",
        "net_thinkness",
        "depth",
        "temperature",
        "result",
        "created_at",
        "updated_at"
      ],
      raw: true
    });
    return result;
  },
  getTableByIdUser: async id => {
    var result = await History.findAll({
      attributes: [
        "gravity",
        "viscosity",
        "porosity",
        "oil_saturation",
        "formation_type",
        "permeability",
        "net_thinkness",
        "depth",
        "temperature",
        "result",
        "created_at",
        "updated_at"
      ],
      raw: true,
      where: {
        created_by: id
      }
    });
    return result;
  }
};
