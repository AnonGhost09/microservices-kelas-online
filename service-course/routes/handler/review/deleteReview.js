const prisma = require("../../../utils/db");

const deleteReview = async id => {
  return prisma.review.delete({
    where: {
      id,
    },
  });
};

module.exports = deleteReview;
