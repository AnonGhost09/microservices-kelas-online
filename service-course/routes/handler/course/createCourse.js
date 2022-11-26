const prisma = require("../../../utils/db");

const createCourse = async (data) => {
    return prisma.course.create({
        data
    })

};


module.exports = createCourse