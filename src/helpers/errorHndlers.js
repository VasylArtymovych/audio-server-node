const unknownRoute = (req, res) => {
  return res.status(404).json({ message: 'Not found.' });
};

const errorHandler = (error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error;
  res.status(status).json({ message });
};

module.exports = {
  unknownRoute,
  errorHandler,
};
