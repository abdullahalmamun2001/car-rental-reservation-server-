/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
}
export type TUserLogin = {
  email: string;
  password: string;
};

// export type TBookingStatics={
//   newPassword:string,
//   hashedPassword:string,
// }
// export interface UserModel extends Model<TBookingStatics> {
//   myStaticMethod(): boolean;
// }

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    newPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
