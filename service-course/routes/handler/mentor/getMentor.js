const prisma = require("../../../utils/db");

const getMentor = async () => {
  return prisma.mentor.findMany();
};

module.exports = getMentor;
