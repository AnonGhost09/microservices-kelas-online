const prisma = require("../../../utils/db");

const deleteImageCourse = async id => {
  return prisma.imageCourse.delete({
    where: {
      id,
    },
  });
};

module.exports = deleteImageCourse;
