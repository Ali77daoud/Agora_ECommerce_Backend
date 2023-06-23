const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const SubCategoryModel = require('../models/subCategoryModel');


exports.setCategoryIdToBody = (req,res,next)=>{
    if(!req.body.category) req.body.category = req.params.categoryId;
    next();
};
// @desc Create subCategory
// @route POST /api/v1/subcategories
// @access Private
exports.createSubCategory = asyncHandler(
    async (req, res) => {
        const { name, category } = req.body;
        const subCategory = await SubCategoryModel.create({
            name: name,
            slug: slugify(name),
            category: category
        });
        res.status(201).json({ data: subCategory });
    }
);

// @desc Update specific subCategory 
// @route PUT  /api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const { name } = req.body;

        const subCategory = await SubCategoryModel.findOneAndUpdate(
            { _id: id },
            { name: name, slug: slugify(name) },
            { new: true }
        );

        if (!subCategory) {
            next(new ApiError(`No SubCategory for this id ${id}`, 404));
        } else {
            res.status(200).json({ data: subCategory });
        }
    }
);

// @desc Delete specific subCategory 
// @route DELETE  /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const subCategory = await SubCategoryModel.findByIdAndDelete(id);

        if (!subCategory) {
            next(new ApiError(`No SubCategory for this id ${id}`, 404));
        } else {
            res.status(204).send();
        }
    }
);

// @desc Get list of subCategory
// @route GET /api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler(
    async (req, res) => {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        const skip = (page - 1) * limit;
        const totalCatergoriesNum = (await SubCategoryModel.find({})).length;
        let totlalPages = 0;

        if ((totalCatergoriesNum % limit) === 0) {
            totlalPages = totalCatergoriesNum / limit;
        } else {
            totlalPages = Math.round((totalCatergoriesNum / limit)) + 1;
        }

        let filterObject = {};

        if(req.params.categoryId) filterObject = {category:req.params.categoryId};

        const subCategories = await SubCategoryModel.find(filterObject)
            .skip(skip)
            .limit(limit);
            // .populate({ path: 'category', select: 'name' });

        res.status(200).json({
            result: subCategories.length,
            page: page,
            totlalPages,
            totalCatergoriesNum: totalCatergoriesNum,
            data: subCategories
        });
    }
);

// @desc Get specific subCategory by id
// @route GET  /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params; // const id = req.params.id;
        const subCategory = await SubCategoryModel.findById(id);
            // .populate({ path: 'category', select: 'name' });
        if (!subCategory) {
            next(new ApiError(`No SubCategory for this id ${id}`, 404));
        } else {
            res.status(200).json({ data: subCategory });
        }
    }
);