function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
}

module.exports = errorHandler;
