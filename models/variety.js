module.exports = (sequelize, DataTypes) => {
  const Variety = sequelize.define("Variety", {
    varietyID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    characteristics: {
      type: DataTypes.STRING,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Variety;
};
