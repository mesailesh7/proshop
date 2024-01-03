// if no middleware handles the request and will create a new error object and set the code to 404
const notFound = (rq, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// overwrite the default express error handler
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // check for mongoose bad objectId or cast error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }

  //   FInal response
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

export { notFound, errorHandler };
