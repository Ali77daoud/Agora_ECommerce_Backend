const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ProductModel = require('../models/productModel');

// @desc Create Product
// @route POST /api/v1/product
// @access Private
exports.createProduct = asyncHandler(
    async (req, res) => {
        req.body.slug = slugify(req.body.title);
        const product = await ProductModel.create(req.body);
        res.status(201).json({ data: product });
    }
);

// @desc Update specific Product 
// @route PUT  /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const product = await ProductModel.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        );

        if (!product) {
            next(new ApiError(`No Product for this id ${id}`, 404));
        } else {
            res.status(200).json({ data: product });
        }
    }
);

// @desc Delete specific Product 
// @route DELETE  /api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const product = await ProductModel.findByIdAndDelete(id);

        if (!product) {
            next(new ApiError(`No Product for this id ${id}`, 404));
        } else {
            res.status(204).send();
        }
    }
);
// @desc Get list of Products
// @route GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(
    async (req, res) => {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        const skip = (page - 1) * limit;
        const totalProductsNum = (await ProductModel.find({})).length;
        let totlalPages = 0;

        if ((totalProductsNum % limit) === 0) {
            totlalPages = totalProductsNum / limit;
        } else {
            totlalPages = Math.round((totalProductsNum / limit)) + 1;
        }

        const products = await ProductModel.find({}).skip(skip).limit(limit);
        res.status(200).json({ result: products.length, page: page, totlalPages, totalProductsNum: totalProductsNum, data: products });
    }
);

// @desc Get specific Product by id
// @route GET  /api/v1/products/:id
// @access Public
exports.getProduct = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params; // const id = req.params.id;
        const product = await ProductModel.findById(id);
        if (!product) {
            next(new ApiError(`No Product for this id ${id}`, 404));
        } else {
            res.status(200).json({ data: product });
        }
    }
);
