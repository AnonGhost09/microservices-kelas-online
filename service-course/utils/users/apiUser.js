const { default: axios } = require("axios");
require("dotenv").config();
const { SERVICE_USER_TIMEOUT, SERVICE_USER_URL } = process.env;

const apiUser = axios.create({
  baseURL: SERVICE_USER_URL,
  timeout: +SERVICE_USER_TIMEOUT,
});

module.exports = apiUser;
