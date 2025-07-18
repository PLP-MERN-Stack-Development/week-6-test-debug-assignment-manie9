
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const bugRoutes = require('./routes/bugRoutes');

app.use(express.json());

// Use morgan for logging HTTP requests
app.use(morgan('dev'));

app.use('/api/bugs', bugRoutes);

// Global error handler middleware
app.use(errorHandler);

// Placeholder route
app.get('/', (req, res) => {
  res.send('MERN Bug Tracker API');
});

module.exports = app;
