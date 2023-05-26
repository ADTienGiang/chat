'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SystemAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SystemAccount.belongsTo(models.User);
      // define association here
    }
  }
  SystemAccount.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SystemAccount',
  });
  return SystemAccount;
};