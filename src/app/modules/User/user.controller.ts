import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import {
  createUserService,
  userLoginService,
  getAllUserService,
} from './user.services';
import config from '../../config';


export const createUserController = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await createUserService(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully',
    data: result,
  });
});
export const getAllUserController = catchAsync(async (req, res) => {
  // const userData = req.body;
  const result = await getAllUserService();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully',
    data: result,
  });
});
export const createUserLoginController = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await userLoginService(userData);
  const { accessRefreshToken, accessToken } = result;
  res.cookie('refreshToken', accessRefreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully',
    data: result.user,
    token: accessToken,
  });
});
