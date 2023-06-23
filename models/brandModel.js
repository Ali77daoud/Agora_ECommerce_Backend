const mongoose = require('mongoose');


// 1- Brand Schema
const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Brand required'],
            unique: [true, 'Brand must be unique'],
            minlength: [3, 'Too short Brand name'],
            maxlength: [32, 'Too long Brand name'],
        },
        // A and B => shoping.com/a-and-b
        slug: {
            type: String,
            lowercase: true,
        },
        image: String,
    },
    { timestamps: true }
);

// 2- Create model
const BrandModel = mongoose.model('Brand', brandSchema);

module.exports = BrandModel;