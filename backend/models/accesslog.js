'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(AccessLog);
      models.ChatRoom.hasMany(AccessLog);
    }
  }
  AccessLog.init({
    user_id: DataTypes.INTEGER,
    chat_room_id: DataTypes.INTEGER,
    ip_address: DataTypes.STRING,
    access_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AccessLog',
  });
  return AccessLog;
};