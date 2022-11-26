const prisma = require("../../../utils/db");

const deleteCourse = async (id) => {
    return prisma.course.delete({
        where: {
            id
        }
    })

}

module.exports = deleteCourse;