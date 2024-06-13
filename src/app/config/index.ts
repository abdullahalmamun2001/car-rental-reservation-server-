import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_token_expire_time:process.env.EXPIRES_ACCESS_TIME,
  jwt_access_token:process.env.JWT_ACCESS_TOKEN,
  jwt_access_refresh:process.env.JWT_REFRESH_TOKEN,
  jwt_access_refresh_expire_time:process.env.EXPIRES_REFRESH_TIME,
  bcrypt_salt:process.env.BCRYPT_SALT

};
