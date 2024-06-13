import httpStatus, { BAD_REQUEST } from 'http-status';
import { AppError } from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import jwt from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

export const createUserService = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(BAD_REQUEST, 'Email already exists');
  }
  const result = await User.create(payload);
  return result;
};
export const userLoginService = async (payload: TUser) => {
  // const result=await User.create(payload);

  const { email, password } = payload;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Sorry Your email is not registered',
    );
  }
  const userPassword = user.password;
  const userPasswordMatch = await bcrypt.compare(password, userPassword);
  if (!userPasswordMatch) {
    throw new AppError(BAD_REQUEST, 'user password is wrong');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: config.jwt_access_token_expire_time,
  });
   const accessRefreshToken = jwt.sign(
    jwtPayload,
    config.jwt_access_refresh as string,
    {
      expiresIn: config.jwt_access_refresh_expire_time,
    },
  );
  return{user,accessRefreshToken,accessToken}
};

export const getAllUserService = async () => {
  return await User.find();
};
