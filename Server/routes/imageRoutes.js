const express = require ('express');
const router = express.Router();
const{getproductimage} = require ('../controllers/imageController')

router.get('/', getproductimage);

module.exports = router;
