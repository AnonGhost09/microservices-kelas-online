const { User } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const userIds = req.query.user_ids || []; //untuk melakukan filter search id

    console.log(userIds);

    const sqlOption = {
      attributes: ["id", "name", "email", "role", "profession", "avatar"], //hanya menampilkan field ini saja
    };

    if (userIds.length) {
      // akan menjadi where in [id1, id2, id3,...]
      sqlOption.where = {
        id: userIds,
      };
    }
    console.log(sqlOption);

    const users = await User.findAll(sqlOption);

    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
