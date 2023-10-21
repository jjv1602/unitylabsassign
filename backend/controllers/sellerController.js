const expressAsyncHandler = require('express-async-handler');
const asyncHandler = require('express-async-handler')
const Cat = require('../models/catalogModel');
const User = require('../models/userModels');
const Product = require('../models/productModel');


const createCatalog = asyncHandler(async (req, res) => {
  try {
    // here in routes first token authentication is there and protect would give user_id
    const sender = await User.findById(req.user._id);
    const {product}=req.body;
    console.log(product);
    let product_list = product;
    let savedProducts=[];
    var savedCatalog;
    console.log(sender);
    if (sender && sender.type_of_user === 'seller') {
      Cat.create({ creator_id: sender._id, })

      // First Saving each product in Product Table 
      for (const el of product_list) {
        // Create a new product document for each name and save it to the database
        const product = await Product.create({name:el.name,price:el.price});
        const savedProduct = await product.save();
        savedProducts.push(savedProduct._id);
      }

      // Then saving product in catalog
      const catalog=await Cat.create({
        creator_id:sender,
        products:savedProducts
      })
      savedCatalog= await catalog.save();
    }
    console.log(savedCatalog);
    res.status(200).json(savedCatalog);
  }
  catch (error) {
    res.status(400).json(error.message);
  }
});


const getOrders = asyncHandler(async (req, res) => {

});

module.exports = { createCatalog, getOrders };