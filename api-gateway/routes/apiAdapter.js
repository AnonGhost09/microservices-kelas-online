const { default: axios } = require("axios");

const { TIMEOUT } = process.env;

module.exports = baseUrl => {
  //TIMEOUT berguna untuk jika tidak bisa diakses dalam waktu tertentu maka akan me return bahwa tidak bisa diakses
  return axios.create({
    baseURL: baseUrl,
    timeout: +TIMEOUT, //biar integer
  });
};
