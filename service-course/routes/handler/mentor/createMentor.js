const prisma = require("../../../utils/db");

const createMentor = async body => {
  return prisma.mentor.create({
    data: body,
    select: {
      name: true,
      profile: true,
      email: true,
      profession: true,
    },
  });
};

module.exports = createMentor;
