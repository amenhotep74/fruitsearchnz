module.exports = (sequelize, DataTypes) => {
  const Specie = sequelize.define("Specie", {
    specieID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    genus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Specie;
};
