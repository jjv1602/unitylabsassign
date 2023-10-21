const mongoose = require('mongoose')
const catalogSchema = mongoose.Schema(
    {
        creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        products: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        }],
    },
    {
        timestamps: true,
    }
);

const Cat = mongoose.model('Cat', catalogSchema);
module.exports = Cat;