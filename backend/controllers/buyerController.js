const expressAsyncHandler = require('express-async-handler');
const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModels');
const Cat = require('../models/catalogModel');



const getSellerList = asyncHandler(async (req, res) => {
  try {
    // here in routes protect is there and protect would give user_id
    const sellers = await User.find({ type_of_user: 'seller' });
    console.log(sellers);
    res.status(200).json(sellers);
  }
  catch (error) {
    res.status(400).json(error.message);
  }
});


const getCatalog = asyncHandler(async (req, res) => {
  try {
    const seller = req.params.seller_id;
    const verify = await User.findById(seller);
    if (verify.type_of_user === 'seller') {
      const catalog = await Cat.find({ creator_id: seller }).populate('products');
      res.status(200).json(catalog);
    } else {
      throw new Error("Invalid Seller Id");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }

});
const createOrder = asyncHandler(async (req, res) => {
  try {
    // here in routes first token authentication is there and protect would give user_id
    const buyer = await User.findById(req.user._id);
    const seller = req.params.seller_id;

    // Here product would contain list of product ids
    const { product } = req.body;

    let product_list = product;
    let result = [];
    if (buyer && buyer.type_of_user === 'buyer') {
      for (const id of product_list) {
        if (await Product.findById(id)) {
          const order = await Order.create({ buyer: buyer, seller: seller, product: id });
          const orderplaced = await order.save();
          result.push(orderplaced);
        } else {
          throw new Error("Wrong Product _id ");
        }
      }
      console.log(result);
      res.status(200).json(result);
    } else {
      throw new Error("Seller cannot place order");
    }

  }
  catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = { getSellerList, getCatalog, createOrder };