const express = require('express');
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');
const errorHandler = require('./middleware/errorHandler');
const alertRoutes = require('./routes/alerts');

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/alerts', validator, alertRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;





