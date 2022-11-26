const prisma = require("../../../utils/db");

const deleteLesson = async id => {
  return prisma.lesson.delete({
    where: {
      id,
    },
  });
};

module.exports = deleteLesson;
