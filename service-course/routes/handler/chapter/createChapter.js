const prisma = require("../../../utils/db")

const createChapter = async (data) => {
    return prisma.chapter.create({
        data
    });
}

module.exports = createChapter