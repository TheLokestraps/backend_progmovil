const notFoundMiddelware = (error, _req, res, next) => {
  try {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    res.status(status).json({ ok: false, status, message });
  } catch (errorException) {
    next(errorException);
  }
};

export default notFoundMiddelware;
