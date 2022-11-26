const prisma = require("../../../utils/db");

const cekReview = async ({ userId, courseId }) => {
  return prisma.review.findUnique({
    where: {
      course_id_user_id: {
        course_id: courseId,
        user_id: userId,
      },
    },
  });
};

module.exports = cekReview;
