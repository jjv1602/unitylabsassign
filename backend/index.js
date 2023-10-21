const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
const connectDB=require("./config/db.js");
const authRoutes=require("./routes/authRoutes.js");
const buyerRoutes=require("./routes/buyerRoutes.js");
const sellerRoutes=require("./routes/sellerRoutes")

dotenv.config({ path: path.resolve(__dirname, '../.env') });;

connectDB();
const app=express();
app.use(express.json());

//authRoutes 
app.use('/api/auth',authRoutes);

// buyerRoutes 
app.use('/api/buyer',buyerRoutes);   

// sellerRoutes 
app.use('/api/buyer',sellerRoutes);   

const { errorHandler, notFound } = require('./middlewares/errorMiddlewares');
app.use(notFound)
app.use(errorHandler)
const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started on port ${PORT} `));
