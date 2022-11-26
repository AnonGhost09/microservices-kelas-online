const prisma = require("../../../utils/db");

const updateReview = async (id, data) => {
  return prisma.review.update({
    where: {
      id,
    },
    data: {
      rating: data.rating,
      note: data.note,
    },
  });
};

module.exports = updateReview;
