module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define("Plant", {
    plantID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    updatedon: {
      type: DataTypes.DATE,
    },
    gpslat: {
      type: DataTypes.STRING,
    },
    gpslong: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.STRING,
    },
    blossomdate: {
      type: DataTypes.DATE,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.STRING,
    },
    trunkdiameter: {
      type: DataTypes.STRING,
    },
    diseases: {
      type: DataTypes.STRING,
    },
  });
  return Plant;
};
