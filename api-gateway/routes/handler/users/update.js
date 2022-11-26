const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_USER } = process.env;
const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const id = req.user.data.id;
    const update = await api.put(`/users/${id}`, req.body);

    return res.json(update.data); //axios harus masuk kedalam data... agar masuk ke payload / isinya
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
