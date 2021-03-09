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
      unique: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    suburb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ruraldelivery: {
      type: DataTypes.STRING,
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
