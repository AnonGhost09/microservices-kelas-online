const apiUser = require("./apiUser");

const getUser = async userId => {
  try {
    const user = await apiUser.get(`/${userId}`);
    return user;
  } catch (e) {
    return {
      status: "error",
      http_code: 500,
      message: "service user unavailable",
    };
  }
};

const getUserByIds = async ids => {
  try {
    const users = await apiUser.get(`/`, {
      params: {
        "user_ids[]": ids,
      },
    });

    return users;
  } catch (e) {
    return {
      status: "error",
      http_code: 500,
      message: "service user unavailable",
    };
  }
};
module.exports = {
  getUser,
  getUserByIds,
};
