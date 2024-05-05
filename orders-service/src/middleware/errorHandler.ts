import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
};

export default errorHandler;
