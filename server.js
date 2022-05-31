// import of needed packages
require("dotenv").config();
require('express-async-errors');
const express = require("express");
const cors = require('cors');

// modules imports
const authRoutes = require('./routes/authentication');
const userRoutes = require('./routes/user');
const DB = require('./config/dbConfig');
// const notFound = require('./Middlewares/not-found');

// define server port
const port = process.env.PORT || 3000;

// create express app
const app = express();

// parse incoming request payload
app.use(express.urlencoded({ extended: true }));

//add json parser
app.use(express.json());

// allow access to this back-end server from everywhere
app.use(cors({origin: '*'}));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
// app.use(notFound);

/**
 * @function start
 * The logic for connection to database and run the server on a given port
 */
const start = async () => {
  // connection to database
  try {
    await DB.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    throw new Error('Unable to connect to the database:', error);
  };

  // add a listener on defined port
  app.listen(port, () => {
    console.log(`Server is listening on port : ${port}...`);
  });
};

// start the server
start();
