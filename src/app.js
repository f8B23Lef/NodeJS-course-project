import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routers/index.js';
import authRouter from './routers/auth.js';
import handleError from './middleware/errorHandler.js';
import requestLogger from './middleware/requestLogger.js';
import authenticateToken from './middleware/authToken.js';
import logger from './logger/logger.js';

const app = express();

app.listen(3000);
app.use(express.json());
app.use(requestLogger);
app.use('/api', cors(), authenticateToken, router);
app.use('/auth', authRouter);
app.use(handleError);

process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});
