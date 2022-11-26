module.exports = (sequelize, DataTypes) => {
  //tabel Mediadepannya harus huruf besar (berlaku untuk setiap table)... filenya juga huruf besar depannya
  const Media = sequelize.define("Media", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      field: "created_at", //harus sama dengan yang di mysql database
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Media;
};
