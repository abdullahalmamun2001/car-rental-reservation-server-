import cors from 'cors';
import express, { Application } from 'express';
import { router } from './app/route';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/', router);

app.use(globalErrorHandler);
// for not fount api
app.use(notFound);

export default app;
