module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user_id: {
      type: DataTypes.INTEGER,
    allowNull:false},
    age: {
      type: DataTypes.INTEGER,
    allowNull:false},
    gender: {
      type: DataTypes.STRING,
    allowNull:false},
    address: {
      type: DataTypes.STRING},
    education: {
      type: DataTypes.STRING},
    martal_status: {
      type: DataTypes.STRING},
    nationality: {
      type: DataTypes.STRING},
    phone: {
      type: DataTypes.STRING},
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE'
    })
  };
  return Profile;
};