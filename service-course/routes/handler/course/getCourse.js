const prisma = require("../../../utils/db");

const getCourse = async (page = 1, limit = 10, searchName, searchStatus = '') => {
    const offset = (page - 1) * limit;
    let where
    const statusArr = ["PUBLISHED", "DRAFT"];

    if (searchName || searchStatus) {
        where = {
            name: {
                contains: searchName,
            },
            status: searchStatus.toUpperCase()
        }

        if (!statusArr.includes(searchStatus.toUpperCase())) {
            delete where.status;
        }
    }

    const [totalRows, data] = await Promise.all([
        prisma.course.count({
            where
        }),
        prisma.course.findMany({
            where,
            skip: offset,
            take: limit,
            orderBy: {
                name: "asc",
            },
        }),
    ]);

    const totalPage = Math.ceil(totalRows / limit);

    return {
        data,
        page,
        limit,
        totalRows,
        totalPage,
    };
};

module.exports = getCourse;