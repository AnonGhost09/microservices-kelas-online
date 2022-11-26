const prisma = require("../../../utils/db");

const createLesson = async data => {
  return prisma.lesson.create({
    data: {
      name: data.name,
      video: data.video,
      chapter_id: data.chapter_id,
    },
  });
};

module.exports = createLesson;
