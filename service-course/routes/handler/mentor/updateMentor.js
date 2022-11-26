const prisma = require("../../../utils/db");

const updateMentor = async (id, dataUpdate) => {
  delete dataUpdate.id; //agar column id tidak di update juga

  return prisma.mentor.update({
    where: {
      id,
    },
    data: dataUpdate,
  });
};

module.exports = updateMentor;