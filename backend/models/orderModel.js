const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')
const orderSchema = mongoose.Schema(
    {
        buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        product:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    },
    {
        timestamps: true,
    }
);

const Order=mongoose.model('Order',orderSchema);
module.exports=Order;