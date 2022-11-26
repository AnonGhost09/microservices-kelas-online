const prisma = require("../../../utils/db");

const detailChapter = async id => {
  return prisma.chapter.findUnique({
    where: { id },
  });
};

module.exports = detailChapter;
