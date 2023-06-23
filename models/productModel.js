const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required : [true, 'title is required'],
            trim: true,
            minlength: [3, 'Too short product title'],
            maxlength: [100, 'Too long product title'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        description:{
            type: String,
            required : [true, 'description is required'],
            minlength: [10, 'Too short product description'],
        },
        quantity:{
            type: Number,
            required : [true, 'quantity required'],
        },
        //numbers of product buying
        sold:{
            type: Number,
            default :0,
        },
        price:{
            type: Number,
            required : [true, 'price is required'],
            trim: true,
            max: [20000000, 'Too long product price'],
        },
        newPrice:{
            type: Number,
        },
        colors:[String],
        images:[String],
        imageCover:{
            type: String,
            required : [true, 'imageCover is required'],
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'product must be belong to category']
        },
        subCategory:[
            {
            type: mongoose.Schema.ObjectId,
            ref: 'SubCategory',
            }
        ],
        brand:{
            type: mongoose.Schema.ObjectId,
            ref: 'Brand',
        },
        ratingAvg:{
            type: Number,
            min : [1,'Ratting must be above or equal 1'],
            max : [5,'Ratting must be under or equal 5']
        },
        ratingsQuantity:{
            type: Number,
            default:0,
        }
    },
    { timestamps: true }
)

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;
