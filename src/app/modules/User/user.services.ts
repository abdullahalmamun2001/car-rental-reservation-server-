import httpStatus, { BAD_REQUEST } from 'http-status';
import { AppError } from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import jwt from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

export const createUserService = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
export const userLoginService = async (payload: TUser) => {
  // const result=await User.create(payload);

  const { email,password } = payload;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'sorry You email is not registered',
    );
  }
  const userPassword=user.password;
  const userPasswordMatch=await bcrypt.compare(password,userPassword)
  if(!userPasswordMatch){
    throw new AppError(BAD_REQUEST,'user password is wrong')
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: '10d',
  });

  return { accessToken };
};
