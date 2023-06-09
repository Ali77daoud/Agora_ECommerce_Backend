const { check } = require('express-validator');
const validatorMiddleWare = require('../../middlewares/validatorMiddleWare');

exports.getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand Id'),
    validatorMiddleWare,
];

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand required')
        .isLength({ min: 3 })
        .withMessage('Too short Brand name')
        .isLength({ max: 32 })
        .withMessage('Too long Brand name'),
    validatorMiddleWare,
];

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleWare,
];

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleWare,
];