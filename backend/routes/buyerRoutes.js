const express=require('express');
const { getSellerList, getCatalog,createOrder} = require('../Controllers/buyerController');
const { protect } = require('../middlewares/authMiddleware');
const router=express.Router()

// To get list of all sellers
router.route('/list-of-sellers').get( getSellerList);  

// To get the catalog by seller
router.route('/seller-catalog/:seller_id').get(protect,getCatalog);

// To create order 
router.route('/create-order/:seller_id').post(protect,createOrder);

module.exports=router;