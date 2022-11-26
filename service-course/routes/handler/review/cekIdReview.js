const prisma = require("../../../utils/db");

const cekIdReview = async id => {
  return prisma.review.findUnique({
    where: {
      id,
    },
  });
};

module.exports = cekIdReview;
