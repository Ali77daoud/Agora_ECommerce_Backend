const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV == 'development') {
        sendErrorForDevelopmentMode(err, res);
    } else {
        sendErrorForProductionMode(err, res);
    }
};

const sendErrorForDevelopmentMode = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorForProductionMode = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}

module.exports = globalError;