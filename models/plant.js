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
    type: {
      type: DataTypes.STRING,
    },
    rootstock: {
      type: DataTypes.STRING,
    },
    synonyms: {
      type: DataTypes.STRING,
    },
    identitycertain: {
      type: DataTypes.STRING,
    },
    public: {
      type: DataTypes.STRING,
    },
    maintainedneglected: {
      type: DataTypes.STRING,
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
    fruitripedate: {
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
