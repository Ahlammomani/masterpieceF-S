const { Image } = require('../models');

const getproductimage = async (req, res) => {
  try {
    // console.log('Attempting to fetch images...');
    
    const images = await Image.findAll({
      attributes: ['id', 'productId', 'image'], 
      include: [{
        association: 'Product', 
        attributes: ['name'] 
      }]
    });

    if (!images || images.length === 0) {
      return res.status(404).json({ message: 'No images found' });
    }

    // console.log('Successfully fetched images:', images.length);
    res.json(images);
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      originalError: error.original
    });
    
    res.status(500).json({ 
      error: 'Failed to fetch images',
      detailed: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { getproductimage };