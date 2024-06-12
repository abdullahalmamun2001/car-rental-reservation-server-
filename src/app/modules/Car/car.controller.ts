import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import {
  createCarServices,
  getAllCarServices,
  getSingleCarServices,
  updateSingleCarServices,
  deleteSingleCarServices,
} from './car.service';

export const createCarController = catchAsync(async (req, res) => {
  const carData = req.body;
  const result = await createCarServices(carData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car created successfully',
    data: result,
  });
});
export const getAllCarCarController = catchAsync(async (req, res) => {
  const result = await getAllCarServices();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: result,
  });
});
export const getSingleCarCarController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await getSingleCarServices(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Car retrieved successfully',
    data: result,
  });
});
export const updateSingleCarCarController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await updateSingleCarServices(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  });
});
export const deleteSingleCarCarController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await deleteSingleCarServices(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Deleted successfully',
    data: result,
  });
});
