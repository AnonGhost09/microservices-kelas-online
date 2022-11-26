const prisma = require("../../../utils/db");

const deleteMentor = async id => {
  return prisma.mentor.delete({
    where: {
      id,
    },
  });
};

module.exports = deleteMentor;
