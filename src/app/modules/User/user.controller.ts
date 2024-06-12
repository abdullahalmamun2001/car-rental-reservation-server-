import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { createUserService, userLoginService } from "./user.services";

export const createUserController=catchAsync(async(req,res)=>{
    const userData=req.body;
    const result=await createUserService(userData)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User create successfully",
        data:result
    })
})
export const createUserLoginController=catchAsync(async(req,res)=>{
    const userData=req.body;
    const result=await userLoginService(userData)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User create successfully",
        data:result
    })
})