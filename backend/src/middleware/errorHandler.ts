import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);

  // Default error
  let status = 500;
  let message = 'Internal server error';

  // Prisma errors
  if (error.message.includes('Unique constraint')) {
    status = 409;
    message = 'Resource already exists';
  }

  if (error.message.includes('Record to delete does not exist')) {
    status = 404;
    message = 'Resource not found';
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';
  }

  if (error.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token expired';
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};