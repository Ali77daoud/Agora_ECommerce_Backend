const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

const CategoryModel = require('../models/categoryModel');
// @desc Get list of Categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(
    async (req, res) => {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        const skip = (page - 1) * limit;
        const totalCatergoriesNum = (await CategoryModel.find({})).length;
        let totlalPages = 0;

        if ((totalCatergoriesNum % limit) == 0) {
            totlalPages = totalCatergoriesNum / limit;
        } else {
            totlalPages = Math.round((totalCatergoriesNum / limit)) + 1;
        }

        const categories = await CategoryModel.find({}).skip(skip).limit(limit);
        res.status(200).json({ result: categories.length, page: page, totlalPages, totalCatergoriesNum: totalCatergoriesNum, data: categories });
    }
);

// @desc Get specific category by id
// @route GET  /api/v1/categories/:id
// @access Public
exports.getCategory = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params; // const id = req.params.id;
        const category = await CategoryModel.findById(id);
        if (!category) {
            next(new ApiError(`No Category for this id ${id}`, 404));
        } else {
            res.status(200).json({ data: category });
        }

    }
);
// @desc Create Category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(
    async (req, res) => {
        const name = req.body.name;
        const category = await CategoryModel.create({ name: name, slug: slugify(name) });
        res.status(201).json({ data: category });
    }
);

// @desc Update specific category 
// @route PUT  /api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const { name } = req.body;

        const category = await CategoryModel.findOneAndUpdate(
            { _id: id },
            { name: name, slug: slugify(name) },
            { new: true }
        );

        if (!category) {
            next(new ApiError(`No Category for this id ${id}`, 404));
        } else {
            res.status(200).json({ data: category });
        }
    }
);

// @desc Delete specific category 
// @route DELETE  /api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const category = await CategoryModel.findByIdAndDelete(id);

        if (!category) {
            next(new ApiError(`No Category for this id ${id}`, 404));
        } else {
            res.status(204).send();
        }
    }
); 