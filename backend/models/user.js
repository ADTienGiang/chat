'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.ChatRoom, { through: 'UserChatRoom',   foreignKey: 'UserId' });
      // define association here
    }
  }
  User.init({
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    provider: DataTypes.STRING,
    providerId: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    question: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    url :  DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};