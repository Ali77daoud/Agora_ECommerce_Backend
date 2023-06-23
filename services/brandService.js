const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const BrandModel = require('../models/brandModel');

// @desc Create Brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = asyncHandler(
    async (req, res) => {
        const  name = req.body.name;
        const brand = await BrandModel.create({ name: name, slug: slugify(name) });
        res.status(201).json({ data: brand });
    }
);

// @desc Update specific Brand 
// @route PUT  /api/v1/brands/:id
// @access Private
exports.updateBrand = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const { name } = req.body;

        const brand = await BrandModel.findOneAndUpdate(
            { _id: id },
            { name: name, slug: slugify(name) },
            { new: true }
        );

        if (!brand) {
            next(new ApiError(`No Brand for this id ${id}`, 404));
        } else {
            res.status(200).json({ data: brand });
        }
    }
);

// @desc Delete specific Brand 
// @route DELETE  /api/v1/brands/:id
// @access Private
exports.deleteBrand = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const brand = await BrandModel.findByIdAndDelete(id);

        if (!brand) {
            next(new ApiError(`No Brand for this id ${id}`, 404));
        } else {
            res.status(204).send();
        }
    }
);
// @desc Get list of Brands
// @route GET /api/v1/brands
// @access Public
exports.getBrands = asyncHandler(
    async (req, res) => {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        const skip = (page - 1) * limit;
        const totalBrandsNum = (await BrandModel.find({})).length;
        let totlalPages = 0;

        if ((totalBrandsNum % limit) === 0) {
            totlalPages = totalBrandsNum / limit;
        } else {
            totlalPages = Math.round((totalBrandsNum / limit)) + 1;
        }

        const brands = await BrandModel.find({}).skip(skip).limit(limit);
        res.status(200).json({ result: brands.length, page: page, totlalPages, totalBrandsNum: totalBrandsNum, data: brands });
    }
);

// @desc Get specific Brand by id
// @route GET  /api/v1/brands/:id
// @access Public
exports.getBrand = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params; // const id = req.params.id;
        const brand = await BrandModel.findById(id);
        if (!brand) {
            next(new ApiError(`No Brand for this id ${id}`, 404));
        } else {
            res.status(200).json({ data: brand });
        }
    }
);
