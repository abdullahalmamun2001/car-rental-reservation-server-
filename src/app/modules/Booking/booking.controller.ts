/* eslint-disable no-undef */
import httpStatus, { BAD_REQUEST, NOT_FOUND } from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import {
  createBookingServices,
  getAllBookingServices,
  bookingService,
} from './bookling.services';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { User } from '../User/user.model';

export const createBookingController = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(NOT_FOUND, 'You have no access to this route');
  }
  const accessToken = token.split(' ')[1];

  const verifyToken = jwt.verify(
    accessToken as string,
    config.jwt_access_token as string,
  );
  const { userEmail } = verifyToken as JwtPayload;
  const userDoc = await User.findOne({ email: userEmail });
  if (!userDoc) {
    throw new AppError(NOT_FOUND, 'user not found');
  }

  bookingData.user = userDoc._id;
  const result = await createBookingServices(bookingData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings created successfully',
    data: result,
    token: '',
  });
});

export type queryObj = { carId?: string; date?: string; isBooked?: string };
export const getAllBookingController = catchAsync(async (req, res) => {
  const { carId, date, isBooked } = req.query as {
    carId?: string;
    date?: string;
    isBooked?: string;
  };

  const query: queryObj = {};

  if (carId) query.carId = carId;
  if (date) query.date = date;
  if (isBooked) query.isBooked = isBooked;

  const result = await getAllBookingServices(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

export const getUsersBookingController = catchAsync(async (req, res) => {
  const userToken = req.headers.authorization?.split(' ')[1];
  if (!userToken) {
    throw new AppError(BAD_REQUEST, 'token in non valid');
  }

  const decoded = jwt.verify(
    userToken,
    config.jwt_access_token as string,
  ) as JwtPayload;
  const user = await User.findOne({ email: decoded.userEmail });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await bookingService.getUsersBooking(user?._id);

  if (!result || result.length === 0) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully',
    data: result,
  });
});
