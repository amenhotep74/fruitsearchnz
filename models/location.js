module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("Location", {
    locationID: {
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
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gpslat: {
      type: DataTypes.STRING,
    },
    gpslong: {
      type: DataTypes.STRING,
    },
  });
  // Relationships defined here
  // Location.belongsTo(Owner, { foreignKey: "ownerID", as: "owner" });
  return Location;
};
