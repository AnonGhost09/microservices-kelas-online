const prisma = require("../../../utils/db");

const detailLesson = async id => {
  return prisma.lesson.findUnique({
    where: {
      id,
    },
  });
};

module.exports = detailLesson;
