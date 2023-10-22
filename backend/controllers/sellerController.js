const expressAsyncHandler = require('express-async-handler');
const asyncHandler = require('express-async-handler')
const Cat = require('../models/catalogModel');
const User = require('../models/userModels');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');


const createCatalog = asyncHandler(async (req, res) => {
  try {
    // here in routes first token authentication is there and protect would give user_id
    const sender = await User.findById(req.user._id);
    const { product } = req.body;
    console.log(product);
    let product_list = product;
    var savedProducts = [];
    var savedCatalog;
    if (sender && sender.type_of_user === 'seller') {

      // CHECKING IF CATALOG ALREADY EXIST OR NOT 
      const catexist = await Cat.findOne({ creator_id: sender._id });
      if (catexist) {
        throw new Error("Catalog already exists");
      }

      // First Saving each product in Product Table 
      for (const el of product_list) {
        // Create a new product document for each name and save it to the database
        const product = await Product.create({ name: el.name, price: el.price });
        const savedProduct = await product.save();
        savedProducts.push({product:savedProduct._id});
      }
      console.log(savedProducts);
      // Then saving product in catalog
      const catalog = await Cat.create({
        creator_id: sender._id,
        products: savedProducts
      })
      savedCatalog = await catalog.save();
      res.status(200).json(savedCatalog);
    }else{
      throw new Error("Buyer cannot create catalog");
    }
    
  }
  catch (error) {
    res.status(400).json(error.message);
  }
});


const getOrders = asyncHandler(async (req, res) => {
try{
  const seller = await User.findById(req.user._id);
  const order = await Order.find({seller:seller}).populate('product');
  res.status(200).json(order);
}
catch (error) {
  res.status(400).json(error.message);
}});

module.exports = { createCatalog, getOrders };