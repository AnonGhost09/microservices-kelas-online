const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  const id = req.params.id;
  try {
    const mentors = await api.put(`/api/mentors/${id}`, req.body);
    return res.json(mentors.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }
    console.log(error.response);
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
