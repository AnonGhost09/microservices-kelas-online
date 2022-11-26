const prisma = require("../../../utils/db");

const createReview = async ({ user_id, course_id, rating, note }) => {
  return prisma.review.create({
    data: {
      user_id,
      course_id,
      rating,
      note,
    },
  });
};

module.exports = createReview;
