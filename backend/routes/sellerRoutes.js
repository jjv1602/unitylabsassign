const express=require('express');
const { createCatalog, getOrders} = require('../Controllers/sellerController');
const { protect } = require('../middlewares/authMiddleware');
const router=express.Router()

// To get list of all sellers
router.route('/create-catalog').post(protect,createCatalog);  

// To get the catalog by seller
router.route('/orders').get(protect,getOrders);

module.exports=router;