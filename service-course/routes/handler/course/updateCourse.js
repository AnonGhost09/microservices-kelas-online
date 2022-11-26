const prisma = require("../../../utils/db")

const updateCourse = async (id, dataUpdate) => {
    delete dataUpdate.id; //agar column id tidak di update juga

    console.log(dataUpdate)
    return prisma.course.update({
        where: {
            id
        },
        data: dataUpdate,
    })
}

module.exports = updateCourse