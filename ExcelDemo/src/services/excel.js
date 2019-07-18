import axios from "axios";

const getListData = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/getListData`);
};

const selectFile = params => {
  return axios.post(`${process.env.REACT_APP_API_URL}/selectFile`, params);
};

const upload = params => {
  return axios.post(`${process.env.REACT_APP_API_URL}/upload`, params);
};

const processData = params => {
  return axios.get(`${process.env.REACT_APP_API_URL}/process`, params);
};
const getTable = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/getTable`);
};
const getTableHistory = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/getTableHistory`);
};
export default {
  getListData,
  selectFile,
  upload,
  processData,
  getTable,
  getTableHistory
};
