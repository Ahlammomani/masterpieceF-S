const { Product, Category, Image ,ProductCategory} = require("../models");
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


const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { 
          model: Image, 
          as: 'images',
          attributes: ['id', 'image'] // نجلب فقط الحقول المطلوبة
        },
        { 
          model: Category,
          as: 'categories',
          attributes: ['id', 'name'],
          through: { attributes: [] } // نتجاهل جدول الربط
        }
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'] // نتجاهل هذه الحقول
      }
    });

    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' });
    }

    // تعديل مسارات الصور إذا لزم الأمر
    if (product.images) {
      product.images = product.images.map(img => ({
        ...img.get({ plain: true }),
        url: `${process.env.BASE_URL || 'http://localhost:5000'}/${img.image}`
      }));
    }

    res.json(product);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'حدث خطأ في الخادم',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};



const getSimilarProducts = async (req, res) => {
  const productId = req.params.id;

  try {
    // الخطوة 1: الحصول على التصنيفات المرتبطة بالمنتج الحالي
    const productCategories = await ProductCategory.findAll({
      where: { productId },
      attributes: ['categoryId']
    });

    if (!productCategories || productCategories.length === 0) {
      return res.json([]); // لا يوجد تصنيفات مرتبطة
    }

    const categoryId = productCategories[0].categoryId;

    // الخطوة 2: الحصول على المنتجات المشابهة
    const similarProductIds = await ProductCategory.findAll({
      where: {
        categoryId,
        productId: { [Op.ne]: productId }
      },
      attributes: ['productId'],
      group: ['productId'],
      limit: 3
    });

    const ids = similarProductIds.map(item => item.productId);

    const similarProducts = await Product.findAll({
      where: { id: ids },
      include: [
        {
          model: Image,
          as: 'images',
          attributes: ['image']
        }
      ]
    });

    res.json(similarProducts);

  } catch (error) {
    console.error('Error fetching similar products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
  module.exports = { createProduct, getProducts, getProductById ,getSimilarProducts};