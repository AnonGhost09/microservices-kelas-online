const jwt = require("jsonwebtoken");
const {
  URL_SERVICE_USER,
  JWT_SECRET_ACCESS_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;
const apiAdapter = require("../../apiAdapter");

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const email = req.body.email;

    if (!refreshToken || !email) {
      return res.status(400).json({
        status: "error",
        message: "invalid tokezn",
      });
    }

    await api.get("/refresh_tokens", {
      params: {
        refresh_token: refreshToken,
      },
    });

    const decoded = jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN);

    if (decoded.data.email !== email) {
      return res.status(400).json({
        status: "error",
        message: "email is not valid",
      });
    }

    const accessToken = jwt.sign(
      { data: decoded.data },
      JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      }
    );

    return res.json({ status: "succes", token: accessToken });
  } catch (error) {
    //ketika service user mati
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json(data);
    }
    return res.status(401).json({ status: "error", message: error.message });
  }
};
