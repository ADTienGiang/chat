'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.ChatRoom, { through: 'ChatHistory' });
      models.ChatRoom.belongsToMany(models.User, { through: 'ChatHistory' });
      models.Message.belongsToMany(models.User, { through: 'ChatHistory' });
      models.ChatHistory.belongsTo(models.Message, { foreignKey: 'MessageId' });
      models.ChatHistory.belongsTo(models.ChatRoom, { foreignKey: 'chat_room_id' });
      models.ChatHistory.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  ChatHistory.init({
    UserId: DataTypes.INTEGER,
    chat_room_id: DataTypes.INTEGER,
    MessageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChatHistory',
  });
  return ChatHistory;
};