const { check } = require('express-validator');
const validatorMiddleWare = require('../../middlewares/validatorMiddleWare');
const CategoryModel = require('../../models/categoryModel');
const SubCategoryModel = require('../../models/subCategoryModel');

exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid Product Id'),
    validatorMiddleWare,
];

exports.createProductValidator = [
    check('title')
        .isLength({ min: 3 })
        .withMessage('must be at least 3 chars')
        .notEmpty()
        .withMessage('Product required'),
    check('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({ max: 2000 })
        .withMessage('Too long description'),
    check('quantity')
        .notEmpty()
        .withMessage('Product quantity is required')
        .isNumeric()
        .withMessage('Product quantity must be a number'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('Product quantity must be a number'),
    check('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Product price must be a number')
        .isLength({ max: 32 })
        .withMessage('To long price'),
    check('newPrice')
        .optional()
        .isNumeric()
        .withMessage('Product priceAfterDiscount must be a number')
        .toFloat()
        .custom((value, { req }) => {
            if (req.body.price <= value) {
              throw new Error('priceAfterDiscount must be lower than price');
            }
            return true;
          }),
    check('colors')
        .optional()
        .isArray()
        .withMessage('availableColors should be array of string'),
    check('imageCover').notEmpty().withMessage('Product imageCover is required'),
    check('images')
        .optional()
        .isArray()
        .withMessage('images should be array of string'),
    check('category')
        .notEmpty()
        .withMessage('Product must be belong to a category')
        .isMongoId()
        .withMessage('Invalid ID formate').custom((categoryId)=>
            CategoryModel.findById(categoryId).then((category)=>{
                if(!category){
                    return Promise.reject(
                        new Error(`No Category for this Id: ${categoryId}`)
                    );
                }
            })
           ),
    check('subCategory')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID formate').
        custom((subcategoriesIds) =>
        SubCategoryModel.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
          (result) => {
            if (result.length < 1 || result.length !== subcategoriesIds.length) {
              return Promise.reject(new Error(`Invalid subcategories Ids`));
            }
          }
        )
      ).custom((val, { req }) =>
      SubCategoryModel.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdsInDB.push(subCategory._id.toString());
          });
          // check if subcategories ids in db include subcategories in req.body (true)
          if (!val.every((v) => subCategoriesIdsInDB.includes(v))) {
            return Promise.reject(
              new Error(`subcategories not belong to category`)
            );
          }
        }
      )
    ),
    check('brand').optional().isMongoId().withMessage('Invalid ID formate'),
    check('ratingAvg')
        .optional()
        .isNumeric()
        .withMessage('ratingsAverage must be a number')
        .isLength({ min: 1 })
        .withMessage('Rating must be above or equal 1.0')
        .isLength({ max: 5 })
        .withMessage('Rating must be below or equal 5.0'),
    check('ratingsQuantity')
        .optional()
        .isNumeric()
        .withMessage('ratingsQuantity must be a number'),
    validatorMiddleWare,
];

exports.updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid Product id format'),
    validatorMiddleWare,
];

exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid Product id format'),
    validatorMiddleWare,
];


////////////////////////////////////////////////////

