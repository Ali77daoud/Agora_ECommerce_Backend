const mongoose = require('mongoose');

//connect with db
const dbConnection = () => {
    mongoose.connect(process.env.DB_URI).then((conn) => {
        console.log(`DataBase Connected: ${conn.connection.host}`);
    }).catch((err) => {
        console.error(`DataBase Errorr: ${err}`);
        //Stop the node application
        process.exit(1);
    });
};

module.exports = dbConnection;