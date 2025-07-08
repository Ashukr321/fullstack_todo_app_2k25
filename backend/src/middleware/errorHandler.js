import createError from 'http-errors';

const globalErrorHandler = (err, req, res, next) => {
  // Ensure error has a status
  if (!err.status) {
    err = createError(500, err.message || 'Internal Server Error');
  }

  res.status(err.status).json({
    success: false,
    message: err.message || 'Something went wrong'
  });
  
};

export default globalErrorHandler; 