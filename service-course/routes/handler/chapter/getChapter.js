const prisma = require("../../../utils/db");

const getChapter = async courseId => {
  let where = {};
  if (courseId) {
    where = {
      course_id: courseId,
    };
  }
  return prisma.chapter.findMany({
    where,
  });
};

module.exports = getChapter;
