import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { createBookingServices, getAllBookingServices } from "./bookling.services";

export const createBookingController=catchAsync(async(req,res)=>{
    const bookingData=req.body;
    const result=await createBookingServices(bookingData);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Bookings created successfully",
        data:result,
    })
})
export const getAllBookingController=catchAsync(async(req,res)=>{
    const query=req.query;
    // console.log(req.query);
    const result=await getAllBookingServices(query);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Bookings retrieved successfully",
        data:result,
    })
})