const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_USER } = process.env;
const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const id = req.user.data.id;
    const user = await api.delete(`/users/logout/${id}`); //method delete tidak bisa menggunaka body (hanya bisa menggunakan params)

    return res.json(user.data); //axios harus mengarah ke data untuk megambil isinya
  } catch (err) {
    if (err.code === "ECONNREFUSE") {
      return res.status(500).json({
        status: "error",
        message: "service unavailable",
      });
    }
    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
