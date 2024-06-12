import { TCar } from './car.interface';
import { Car } from './car.model';

export const createCarServices = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
export const getAllCarServices = async () => {
  const result = await Car.find();
  return result;
};
export const getSingleCarServices = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};
export const updateSingleCarServices = async (
  id: string,
  payload: Partial<TCar>,
) => {
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    upsert: true,
  });
  return result;
};
export const deleteSingleCarServices = async (id: string) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, upsert: true },
  );
  return result;
};
