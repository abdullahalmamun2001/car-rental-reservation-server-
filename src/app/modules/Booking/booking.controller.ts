/* eslint-disable no-undef */
import httpStatus, { BAD_REQUEST, NOT_FOUND } from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import {
  bookingReturn,
  createBookingServices,
  getAllBookingServices,
  // myBookingServices,
} from './bookling.services';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { Booking } from './booking.model';
import { AppError } from '../../errors/AppError';
import { User } from '../User/user.model';
// import { AppError } from '../../errors/AppError';
// import { User } from '../User/user.model';

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
  const {userEmail}=verifyToken as JwtPayload;
  const userDoc=await User.findOne({email:userEmail})
  if(!userDoc){
    throw new AppError(NOT_FOUND,"user not found")
  }
 
  
    bookingData.user=userDoc._id;
    const result =await createBookingServices(bookingData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings created successfully',
      data: result,
      token:""
    });
  })

  // const authorizationToken=req.headers.authorization;
  // if(!authorizationToken){
  //   throw new AppError(BAD_REQUEST,'You are non authorized')
  // }
  // const verifyToken=jwt.verify(authorizationToken as string,config.jwt_access_token as string)
  // const {userEmail,role}=verifyToken as JwtPayload;

  // const {userEmail,role}=verifyToken;
  // console.log(userEmail,role);
  // console.log(bookingData);
 
// });
export type haha = { carId: string; date: string; isBooked: string };
export const getAllBookingController = catchAsync(async (req, res) => {
  // /api/bookings?carId=608a6d8d03a1b40012abcdef&date=2024-06-15&isBooked=unconfirmed
  const { carId, date, isBooked } = req.query;
  const query = { };
  if (carId) query.car = carId;
  if (date) query.date = date;
  if (isBooked) query.isBooked = isBooked;
  // const query2= req.query.isBooked;
  // console.log(query,"hah");
  // console.log(req.query);
  const result = await getAllBookingServices(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

export const myBookingServicesController = catchAsync(async (req, res) => {
  const authorization = req.headers.authorization;
  const verifyToken = jwt.verify(
    authorization as string,
    config.jwt_access_token as string,
  );
  const { userEmail } = verifyToken as JwtPayload;
  const result = await Booking.find().populate('user', 'email');
  // const fn=async()=>{result.filter((data)=>{
  //   const email=data.user.email
  //   if(email==userEmail){
  //    const result=await  Booking.find({email})
  //    return result
  //   }
  //   // const result= Booking.find({userEmail:email})
  //   // console.log(result);
  // })}
  // console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
  // const q=result.filter((el)=>{
  //   const docEmail=el.user.email;
  //   console.log(docEmail);
  //   const isEmailExisting=userEmail==docEmail;
  //   if(isEmailExisting){
  //     const data= Booking.find(userEmail)
  //     console.log(data);
  //     return data
  //   }else{
  //     throw new AppError(NOT_FOUND,"You have no booking")
  //   }
  // const oo= Booking.find(userEmail==docEmail)
  // console.log(oo);
});
// console.log(q);
// const result1=await result.filter((el.user.email==userEmail)=>{
//   console.log(el);
// if(doc==userEmail){
//   const data= Booking.find({el.user.email:userEmail})
//   console.log(data);
// }
// })

// const result = await myBookingServices(userEmail);

// });

export const returnBookingController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await bookingReturn(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings Return successfully',
    data: result,
  });
});
