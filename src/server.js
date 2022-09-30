const express = require('express');
//const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require("morgan");

//set path to .env file
//dotenv.config({ path: './.env' });

const app = express();
//use to log
app.use(morgan("combined"));

//temp for connect DB
const MONGO_USER = 'thanhnhile';
const MONGO_PASS = 'bYdLPCvQVM4x5XVr';
//Connect to MongoDB
mongoose
    .connect(
        `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.r0veury.mongodb.net/CNPMM?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("Connected to MongoDB");
        startServer();
    })
    .catch((err) => console.error(err));

//start server
const startServer = () => {
    // add this middleware to read post request body
    app.use(express.json());
    app.use(express.text());

    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });
    /* Routes */
    app.get('/', (req, res) => res.send('Hello World!'));
    const categoryRoute = require('./routes/category.route');
    app.use('/categories',categoryRoute);

    /** Error handling */
    app.use((req, res, next) => {
        const error = new Error("not found");
        return res.status(404).json({
            message: error.message,
        });
    });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`))
}
