const prisma = require("../../../utils/db");

const cekIdMentor = async id => {
  return prisma.mentor.findUnique({
    where: {
      id,
    },
    select: {
      email: true,
    },
  });
};

module.exports = cekIdMentor;
