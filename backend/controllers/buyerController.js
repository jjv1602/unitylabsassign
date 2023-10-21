const expressAsyncHandler = require('express-async-handler');
const asyncHandler = require('express-async-handler')



const getSellerList = asyncHandler(async (req, res) => {
  try {
    // here in routes protect is there and protect would give user_id
    const book = await User.findById(req.user._id).populate('rented.book');
    res.status(201).json(book);
  }
  catch (error) {
    res.status(400).json(error.message);
  }
});


const getCatalog = asyncHandler(async (req, res) => {

});
const createOrder = asyncHandler(async (req, res) => {

});

module.exports = { getSellerList, getCatalog, createOrder };