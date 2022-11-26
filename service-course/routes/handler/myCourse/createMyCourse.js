const prisma = require("../../../utils/db");

const createMyCourse = async data => {
  return prisma.myCourse.create({
    data: {
      course_id: data.course_id,
      user_id: data.user_id,
    },
  });
};

module.exports = createMyCourse;
