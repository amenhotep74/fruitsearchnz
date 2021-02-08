module.exports = (sequelize, DataTypes) => {
  const Owner = sequelize.define("Owner", {
    ownerID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    website: {
      type: DataTypes.STRING,
    },
  });
  return Owner;
};
