const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
//Connect with db
dbConnection();

// express app
const app = express();

//MiddleWares
app.use(express.json());

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
    console.log(`mode:${process.env.NODE_ENV}`);
} else {
    console.log(`mode:${process.env.NODE_ENV}`);
}

//Mount Routes middleware
app.use('/api/v1/categories', categoryRoute);

// Handle unhandled routes
app.all('*', (req, res, next) => {
    // create error and send it to error handling middleware
    // Pass the error message to next middleware 
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

// Handling errors outside express
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Error: ${err}`);
    //Stop the node application
    server.close(() => {
        console.error(`Shutting down...`);
        process.exit(1);
    });
});