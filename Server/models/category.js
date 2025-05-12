'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: 'ProductCategory', // لازم يتطابق مع اسم الجدول بالضبط
        foreignKey: 'categoryId',
        otherKey: 'productId',
        as: 'products'
      });

      Category.hasMany(models.Review, {
        foreignKey: 'categoryId',
        as: 'reviews'
      });
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
