const prisma = require("../../../utils/db");

const getMyCourse = async userId => {
  let where = {
    user_id: userId,
  };

  if (isNaN(userId)) {
    where.user_id = 0;
  }

  if (!userId) {
    delete where.user_id;
  }

  return prisma.myCourse.findMany({
    where,
    include: {
      course: true,
    },
  });
};

module.exports = getMyCourse;
