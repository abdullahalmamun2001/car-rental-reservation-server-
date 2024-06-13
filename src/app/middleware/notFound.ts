import { NextFunction, Request, Response } from 'express';
import httpStatus, {  NOT_FOUND } from 'http-status';

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode:NOT_FOUND,
    message: 'Not Found Route!!',
  });
};
