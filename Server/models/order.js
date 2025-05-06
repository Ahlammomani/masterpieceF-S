'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    transactionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });

  Order.associate = function(models) {
    Order.belongsTo(models.User, { foreignKey: "userId" });
    Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
    Order.hasOne(models.Delivery, { foreignKey: "orderId" });
    Order.hasOne(models.Payment, { foreignKey: 'orderId', as: 'payment' });
  };
  
  return Order;
};