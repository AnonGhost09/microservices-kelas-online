const prisma = require("../../../utils/db");

const cekIdImageCourse = async id => {
  return prisma.imageCourse.findUnique({
    where: {
      id,
    },
  });
};

module.exports = cekIdImageCourse;
