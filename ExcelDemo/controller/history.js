const history = require("../models/history");

module.exports = {
  createHistory: async (params, result, id) => {
    return await history.createHistory(params, result, id);
  },
  getHistory: async () => {
    return await history.getTable();
  },
  getHistoryByIdUser: async id => {
    return await history.getTableByIdUser(id);
  }
};
