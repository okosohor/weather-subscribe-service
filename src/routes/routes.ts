// import logger from '@config/logger';
import SubscribeController from '@controllers/subscribeController';
import express from 'express';
import loggerMiddleware from 'middlewares/loggerMiddlewar';

const router = express.Router();

router.get('/test', loggerMiddleware, (req, res) => {
  res.status(200).json({ message: 'OK' });
});
// router.get('/testWeather')

// router.get('/weather');
// router.get('/confirm/:token');
// router.get('/unsubscribe/:token');
router.post('/subscribe', loggerMiddleware, SubscribeController.subscribe);
// router.post('/subscribe', loggerMiddleware, (req, res) => {logger.info(req.body)});


export default router;
