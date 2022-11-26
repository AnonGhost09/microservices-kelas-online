const prisma = require("../../../utils/db");

const cekIdLesson = async id => {
  return prisma.lesson.findUnique({
    where: {
      id,
    },
  });
};

module.exports = cekIdLesson;
