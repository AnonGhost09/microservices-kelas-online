const prisma = require("../../../utils/db");

const cekEmailMentor = async email => {
  return prisma.mentor.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });
};

module.exports = cekEmailMentor;
