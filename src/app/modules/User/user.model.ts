import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';


const userSchema = new Schema<TUser,UserModel>(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
    password: String,
    phone: String,
    address: String,
  },
  {
    timestamps: true,
  },
);
// userSchema.pre('save', async function (next) {
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_salt as string),
//   );
//   next();
// });

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt as string),
  );
  next();
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});


userSchema.statics.isPasswordMatched = async function (
  newPassword,
  hashedPassword,
) {
  return await bcrypt.compare(newPassword, hashedPassword);
};
export const User = model('User', userSchema);
