const apiAdapter = require("../../apiAdapter");
require("dotenv").config();
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  const id = req.params.id;
  try {
    const mentor = await api.get(`/api/mentors/${id}`);

    return res.json(mentor.data);
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
