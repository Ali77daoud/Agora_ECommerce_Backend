const { validationResult } = require('express-validator');

const validatorMiddleWare = function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next();
}

module.exports = validatorMiddleWare;