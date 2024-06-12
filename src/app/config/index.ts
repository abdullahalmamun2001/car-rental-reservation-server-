import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_token:process.env.JWT_ACCESS_TOKEN,
  bcrypt_salt:process.env.BCRYPT_SALT
};
