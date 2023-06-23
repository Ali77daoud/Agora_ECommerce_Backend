const express = require('express');

const {
    createSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
    getSubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');

const {
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getSubCategories,
    getSubCategory,
    setCategoryIdToBody
} = require('../services/subCategoryService');

const router = express.Router({mergeParams : true});

router.route('/')
    .post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory).get(getSubCategories);

router.route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory)

module.exports = router;