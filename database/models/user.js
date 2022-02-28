module.exports = (sequelize, DataTypes) => {
  sequelize.define()
  const User = sequelize.define(
    "User",
    {
      google_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasOne(models.Profile, {
      foreignKey: "user_id",
      as: "profile"
    });
  };
  return User;
};
