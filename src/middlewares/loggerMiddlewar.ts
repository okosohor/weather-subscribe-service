import { Request, Response, NextFunction } from 'express';
import logger from '@config/logger';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  res.on('finish', () => {
    logger.info(
      `Request finish: ${req.method} ${req.url} ${res.statusCode}`,
    );
  });
  next();
};

export default loggerMiddleware;
