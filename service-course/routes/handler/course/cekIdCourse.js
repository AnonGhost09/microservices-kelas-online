const prisma = require("../../../utils/db");

const cekIdCourse = async id => {
    return prisma.course.findUnique({
        where: {
            id,
        },

    });
};

module.exports = cekIdCourse;