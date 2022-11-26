const { RefreshToken } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const refreshToken = req.query.refresh_token;

    const token = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });

    if (!token) {
      return res.status(404).json({
        status: "error",
        message: "Invalid Token",
      });
    }

    return res.status(200).json({
      status: "success",
      token,
    });
  } catch (e) {
    return res.status(404).json({
      status: "error",
      message: "Invalid Tokexn",
    });
  }
};
