const prisma = require("../../../utils/db")

const cekIdChapter = async (id) => {
    return prisma.chapter.findUnique({
        where: {
            id
        }
    })
}

module.exports = cekIdChapter