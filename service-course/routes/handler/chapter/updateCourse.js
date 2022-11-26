const prisma = require("../../../utils/db");

const updateCourse = async (id, dataUpdate) => {
    return prisma.chapter.update({
        where: {
            id
        },
        data: {
            name: dataUpdate.name,
            course_id: dataUpdate.course_id
        }

    })
}

module.exports = updateCourse;