import express from 'express';
import dotenv from 'dotenv';
import logger from '@config/logger';

dotenv.config();

const PORT = process.env.PORT || 4444;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server start at port:${PORT}`);
});

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
