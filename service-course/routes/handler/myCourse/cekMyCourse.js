const prisma = require("../../../utils/db");

const cekMyCourse = async data => {
  return prisma.myCourse.findUnique({
    where: {
      course_id_user_id: {
        course_id: data.course_id,
        user_id: data.user_id,
      },
    },
  });
};

module.exports = cekMyCourse;
