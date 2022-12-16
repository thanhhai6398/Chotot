const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

//middlewares
const verifyJWT = require('./middlewares/verifyJWT');
const credentials = require('./middlewares/credentials');
//config
const corsOptions = require('./config/corsOptions');
dotenv.config({ path: './.env' });
//utitls
const STATUS_CODE = require('./utils/httpStatusCode');

//routes
const authUserRoute = require('./routes/auth.route');
const registerRoute = require('./routes/register.route');
const logoutRoute = require('./routes/logout,route');
const refreshRoute = require('./routes/refresh.route');
const categoryRoute = require('./routes/api/category.route');
const postRoute = require('./routes/api/post.route');
const userRoute = require('./routes/api/user.route');
const followingRoute = require('./routes/following.route');

//use to log
app.use(morgan('combined'));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
//Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.r0veury.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch((err) => console.error(err));

//start server
const startServer = () => {
  // add this middleware to read post request body
  app.use(express.json());
  app.use(express.text());

  //middleware for cookies
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));

  /* Routes */
  app.get('/', (req, res) => res.send('Hello World!'));
  /*static folder */
  app.use('/static', express.static(__dirname + 'public'));
  app.use('/auth', authUserRoute);
  app.use('/register', registerRoute);
  app.use('/logout', logoutRoute);
  app.use('/refresh', refreshRoute);
  app.use('/categories', categoryRoute);
  app.use('/posts', postRoute);
  app.use('/getFollowing', followingRoute);
  //authencation
  app.use(verifyJWT);
  app.use('/users', userRoute);

  /** Error handling */
  app.use((req, res, next) => {
    const error = new Error('not found path');
    return res.status(STATUS_CODE.NOT_FOUND).json({
      message: error.message,
    });
  });
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
};
