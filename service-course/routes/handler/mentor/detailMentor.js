const prisma = require("../../../utils/db");

const detailMentor = async id => {
  return prisma.mentor.findUnique({
    where: {
      id,
    },
  });
};

module.exports = detailMentor;
