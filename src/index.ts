import express from 'express';
import dotenv from 'dotenv';
import logger from '@config/logger';
import router from '@routes/routes';
import { createDataBaseConection } from '@config/db';
import initSchedulers from '@utils/scheduler';
import cors from 'cors'

dotenv.config();


const PORT = process.env.PORT || 4444;

const app = express();
app.use(express.json());
app.use(cors());

initSchedulers();

createDataBaseConection()

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});



app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/api',router)