import { NextFunction, Request, Response } from 'express';
import { USER_Role } from '../modules/User/user.constanat';
import { catchAsync } from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';
import { BAD_REQUEST, NOT_FOUND } from 'http-status';
import { User } from '../modules/User/user.model';

export const auth = (...inputRole: (keyof typeof USER_Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      const accessToken=token?.split(' ')[1]
      if (!accessToken) {
        throw new AppError(BAD_REQUEST, 'You have no access to this route');
      }
      const secret = config.jwt_access_token;
      const verifyToken = jwt.verify(accessToken as string, secret as string);
      const { userEmail, role } = verifyToken as JwtPayload;
    
      
      const user = await User.findOne({ email:userEmail ,role:role});
      if (!user) {
        throw new AppError(NOT_FOUND, 'user not found');
      }


      if (user.role !== "admin") {
        throw new Error('You have no access to this route hhh');
      }

  
      if (!inputRole.includes(role)){
        throw new AppError(NOT_FOUND, 'You have no access to this route ami ');
      }
      next();
  });
};
export const authUser = (...inputRole: (keyof typeof USER_Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      const accessToken=token?.split(' ')[1]
      if (!accessToken) {
        throw new AppError(BAD_REQUEST, 'You have no access to this route');
      }
      const secret = config.jwt_access_token;
      const verifyToken = jwt.verify(accessToken as string, secret as string);
      const { userEmail, role } = verifyToken as JwtPayload;
      console.log(userEmail,role);
    
      
      const user = await User.findOne({ email:userEmail ,role:role});
      if (!user) {
        throw new AppError(NOT_FOUND, 'user not found');
      }


      if (user.role !== "user") {
        throw new Error('You have no access to this route hhh');
      }


  
      if (!inputRole.includes(role)){
        throw new AppError(NOT_FOUND, 'You have no access to this route ami ');
      }
      next();
  });
};
