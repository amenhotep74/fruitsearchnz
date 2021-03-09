module.exports = (sequelize, DataTypes) => {
  const Source = sequelize.define("Source", {
    sourceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    sourcename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sourcetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
    reference: {
      type: DataTypes.STRING,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Source;
};
