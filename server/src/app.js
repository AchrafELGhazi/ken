const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// thank u beyonce
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;



mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is up and running on http://localhost:${PORT}`);
      console.log(process.env.NODE_ENV)
    });
  })
  .catch(error => {
    console.error(`Failed to connect to MongoDB: `, error.message);
    process.exit(1);
  });
