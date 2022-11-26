const prisma = require("../../../utils/db");

const getReviewMyCourse = async courseId => {
  return prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      review: true,
      _count: {
        select: {
          myCourse: true,
        },
      },
      chapter: {
        include: {
          lesson: true,
        },
      },
      imageCourse: true,
      mentor: true,
    },
  });
};

module.exports = getReviewMyCourse;
