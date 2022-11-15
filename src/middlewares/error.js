const errorMiddleware = (error, _req, res, next) => {
  try {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    console.log('Error handling here!');

    res.status(status).json({ ok: false, status, message });
  } catch (errorException) {
    next(errorException);
  }
};

export default errorMiddleware;
