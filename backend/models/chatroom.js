'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatRoom.belongsToMany(models.User, { through: 'UserChatRoom',foreignKey: 'ChatRoomId' });
      ChatRoom.hasMany(models.Message);
    }
  }
  ChatRoom.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    member_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChatRoom',
  });
  return ChatRoom;
};