const CategoryModel = require('../models/categoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');

exports.getCategories = (req, res) => {
    // const name = req.body.name;
    // console.log(req.body);

    res.send("getCategories");
};

// First way 
// exports.createCategory = (req, res) => {
//     const name = req.body.name;
//     CategoryModel.create({ name:name, slug: slugify(name) }).then((category) =>
//         res.status(201).json({ data: category })
//     ).catch(err => res.status(400).send(err));
//     // const newCategory = new CategoryModel({ name }); // or ({name:name})

//     // newCategory.save().then((doc) => {
//     //     res.json(doc);
//     // }).catch((err) => {
//     //     res.json(err);
//     // });
// }
// Second way 
// exports.createCategory = async (req, res) => {
//     const name = req.body.name;

//     try {
//         const category = await CategoryModel.create({ name: name, slug: slugify(name) });
//         res.status(201).json({ data: category });
//     } catch (err) {
//         res.status(400).send(err);
//     }
// }
// Third way the best using express-async-handler
exports.createCategory = asyncHandler(
    async (req, res) => {
        const name = req.body.name;
        const category = await CategoryModel.create({ name: name, slug: slugify(name) });
        res.status(201).json({ data: category });
    }
);
