'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    amount: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    paypalOrderId: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
  });

  Payment.associate=function(models){
    Payment.belongsTo(models.User,{
      foreignKey:'userId',
      as:'user',
      onDelete:'CASCADE',
    });
    Payment.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
  };
  return Payment;
};