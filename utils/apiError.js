class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? 'failed' : 'error';
        // Error created by me
        this.isOperational = true;
    }
}

module.exports = ApiError;