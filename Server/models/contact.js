'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  Contact.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM("Read", "Unread"),
      defaultValue: "Unread"
    },
    adminReply: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};
