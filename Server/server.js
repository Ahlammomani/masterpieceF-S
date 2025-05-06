const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const { sequelize } = require("./models");
const cookieParser = require("cookie-parser");
const userRoutes = require ("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productCategoryRoutes = require('./routes/ProductCategoryRoute');
const google=require("./routes/googleRoutes");
dotenv.config();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173 ", 
    credentials: true, 
  })
);
app.use(express.json());
// إعداد الـ Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
app.use('/users', userRoutes)
app.use('/auth', google);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/product-categories', productCategoryRoutes);