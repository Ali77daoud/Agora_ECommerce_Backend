const { check } = require('express-validator');
const validatorMiddleWare = require('../../middlewares/validatorMiddleWare');

exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory Id'),
    validatorMiddleWare,
];

exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory required')
        .isLength({ min: 2 })
        .withMessage('Too short SubCategory name')
        .isLength({ max: 32 })
        .withMessage('Too long SubCategory name'),
    check('category').notEmpty().withMessage('SubCategory must be belong to category')
        .isMongoId().withMessage('Invalid Category Id'),
    validatorMiddleWare,
];

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format'),
    validatorMiddleWare,
];

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format'),
    validatorMiddleWare,
];