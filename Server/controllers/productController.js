const { Product, Category, Image } = require("../models");
const { Op } = require("sequelize");

const createProduct = async (req, res) => {
  try {
    const { name, price, categoryIds, description, quantity } = req.body;

    if (!name || !price || !categoryIds || !description) {
      return res.status(400).json({ error: "الرجاء ملء جميع الحقول المطلوبة" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      quantity,
    });

    // Connect the product to multiple categories
    if (Array.isArray(categoryIds) && categoryIds.length > 0) {
      await product.addCategories(categoryIds);
    }

    // If images are uploaded
    if (req.files && req.files.length > 0) {
      const imageRecords = req.files.map(file => ({
        image: file.path,
        productId: product.id,
      }));

      await Image.bulkCreate(imageRecords);
    }

    res.status(201).json(product);
  } catch (error) {
    console.error("خطأ أثناء إضافة المنتج:", error);
    res.status(500).json({ error: "Error creating product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const { search, categoryId } = req.query;

    const where = {};
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    const products = await Product.findAll({
      where,
      include: [
        { model: Category, as: 'categories', attributes: ["id", "name"] },
        { model: Image, as: 'images', attributes: ["image"] },
      ],
    });

    // Filter by categoryId manually (since it's many-to-many now)
    let filteredProducts = products;
    if (categoryId) {
      filteredProducts = products.filter(product =>
        product.categories.some(category => category.id == categoryId)
      );
    }

    res.json(filteredProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "حدث خطأ أثناء جلب المنتجات" });
  }
};


  

  module.exports = { createProduct, getProducts };