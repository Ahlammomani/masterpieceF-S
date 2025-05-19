'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Delivery.init({
    orderId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    status: DataTypes.STRING,
     deliveryDate: DataTypes.DATEONLY 
  }, {
    sequelize,
    modelName: 'Delivery',
  });

  Delivery.associate = function(models) {
    Delivery.belongsTo(models.Order, { foreignKey: "orderId" });
  };
  return Delivery;
};