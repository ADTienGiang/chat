'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.ChatRoom);
      Message.belongsTo(models.User);
    }
  }
  Message.init({
    content: DataTypes.TEXT,
    sender: DataTypes.STRING,
    receiver : DataTypes.STRING,
    id_sender : DataTypes.INTEGER,
    id_receiver : DataTypes.INTEGER,
    sent_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};