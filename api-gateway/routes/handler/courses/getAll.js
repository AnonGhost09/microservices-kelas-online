require("dotenv").config();
const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  const query = req.query;
  try {
    const courses = await api.get("/api/courses", {
      params: {
        page: query.page,
        limit: query.limit,
        q: query.q,
        status: query.status,
      },
    });
    return res.json(courses.data);
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
