const prisma = require("../../../utils/db");

const createImageCourse = async data => {
  console.log(data);
  return prisma.imageCourse.create({
    data: {
      course_id: data.course_id,
      image: data.image,
    },
  });
};

module.exports = createImageCourse;
