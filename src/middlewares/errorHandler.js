import { isHttpError } from 'http-errors';

export function errorHandler(error, req, res, next) {
  if (isHttpError(error)) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
}
