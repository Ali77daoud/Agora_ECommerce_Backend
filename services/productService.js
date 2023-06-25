const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ProductModel = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');

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
        const totalProductsNum = (await ProductModel.find({})).length;
        // Build Query
        const apiFeatures = new ApiFeatures(ProductModel.find(),req.query)
        .paginate(totalProductsNum)
        .filter()
        .sort()
        .search();
        // Execute Query
        const products = await apiFeatures.mongooseQuery;
        res.status(200).json({ 
            result: products.length,
            totlalPages:apiFeatures.totlalPages,
            productsNumber:totalProductsNum,
            page: apiFeatures.page, 
            data: products });
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
