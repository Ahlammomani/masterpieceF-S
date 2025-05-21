const express = require("express");
const cors = require("cors");
// const dotenv = require("dotenv");
require('dotenv').config();
const bodyParser = require("body-parser");
const path = require("path");
const { sequelize } = require("./models");
const cookieParser = require("cookie-parser");
const userRoutes = require ("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productCategoryRoutes = require('./routes/ProductCategoryRoute');
//const google=require("./routes/googleRoutes");
const imageRoutes =require ("./routes/imageRoutes")
const reviewRoutes = require('./routes/reviewRoutes');
const Cart = require('./routes/cartRoutes');
const Order=require('./routes/orderRoutes');
const Reviews=require('./routes/reviewRoutes');
const Contact = require('./routes/contactRoutes');
const payment = require('./routes/paymentRoutes');
const overview = require('./routes/overviewRoutes');



const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);
app.use(express.json());
// إعداد الـ Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));





app.use('/users', userRoutes)
//app.use('/auth', google);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/product-categories', productCategoryRoutes);
app.use('/api/images',imageRoutes);
app.use('/api', reviewRoutes);
app.use('/api/cart', Cart);
app.use('/api/orders',Order);
app.use('/api',Reviews);
app.use('/api',Contact);
app.use('/api/payments', payment);
app.use('/api/overview', overview);
// not found
app.use((req, res, next) => {
  res.status(404).json({ message: "404 - Page Not Found" });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


