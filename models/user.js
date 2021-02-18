module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
    isVolunteer: {
      type: DataTypes.BOOLEAN,
    },
    volunteerSubmissionActive: {
      type: DataTypes.BOOLEAN,
    },
    isOwner: {
      type: DataTypes.BOOLEAN,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    skills: {
      type: DataTypes.STRING,
    },
    experience: {
      type: DataTypes.STRING,
    },
    userSave: {
      type: DataTypes.STRING,
    },
  });
  return User;
};
