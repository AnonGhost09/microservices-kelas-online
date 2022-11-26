const prisma = require("../../../utils/db");

const updateLesson = async (id, { name, video, chapter_id }) => {
  return prisma.lesson.update({
    where: {
      id,
    },
    data: {
      name,
      video,
      chapter_id,
    },
  });
};

module.exports = updateLesson;
