import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { sendResponse } from './app/utils/sendResponse';
import httpStatus from 'http-status';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.use('/api/jj', (req, res) => {
      sendResponse(res,{
        statusCode:httpStatus.OK,
        message:'jjj',
        data:null,
        success:true
       })
    });
    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
