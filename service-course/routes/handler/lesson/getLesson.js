const prisma = require("../../../utils/db");

const getLesson = async chapterId => {
  if (chapterId) {
    chapterId = +chapterId;
  }
  return prisma.lesson.findMany({
    where: {
      chapter_id: chapterId,
    },
  });
};

module.exports = getLesson;
