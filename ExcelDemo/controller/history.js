const history = require("../models/history");

module.exports = {
  createHistory: async (params, result) => {
    return await history.createHistory(params, result);
  },
  getHistory: async () => {
    return await history.getTable();
  }
};
