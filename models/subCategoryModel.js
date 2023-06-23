const mongoose = require('mongoose');

// 1- Create Schema

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true, // to remove spaces from name
            unique: [true, "name must be unique"],
            minlength: [2, 'Too short subCategoey name'],
            maxlength: [32, 'Too long subCategoey name'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'SubCategoey must be belong to category']
        }
    },
    { timestamps: true }
)

// 2- Create model
const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategoryModel;