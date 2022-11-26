const prisma = require("../../../utils/db");

const deleteChapter = async id => {
  return prisma.chapter.delete({
    where: {
      id,
    },
  });
};

module.exports = deleteChapter;
