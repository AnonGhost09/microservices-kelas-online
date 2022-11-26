"use strict";
const bcrypt = require("bcrypt");
module.exports = {
  //npx sequelize seed:create --name=user-seeders untuk install seeders
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        name: "John Doe",
        profession: "Admin micro",
        role: "admin",
        email: "pramudyaalamsyah@gmail.com",
        password: await bcrypt.hash("tianaja00", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Dipa Doe",
        profession: "Frontend developer",
        role: "student",
        email: "pramudyaalamsyah@gmail2.com",
        password: await bcrypt.hash("tianaja00", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    //untuk menghaus data
    await queryInterface.bulkDelete("users", null, {});
  },
};
