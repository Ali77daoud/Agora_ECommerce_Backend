const express = require('express');
const { getCategories, createCategory } = require('../services/categoryService');

// router.get('/', getCategories);
// router.post('/', createCategory);
const router = express.Router();
router.route('/').get(getCategories).post(createCategory);

module.exports = router;