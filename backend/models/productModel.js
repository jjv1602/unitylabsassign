const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product=mongoose.model('Product',productSchema);
module.exports=Product;