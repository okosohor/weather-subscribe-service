import SubscribeController from '@controllers/subscribeController';
import express from 'express';
import loggerMiddleware from 'middlewares/loggerMiddlewar';
import WeatherContoller from '@controllers/weatherContoller';

const router = express.Router();

router.get('/weather', loggerMiddleware, WeatherContoller.getWeather);
router.get('/confirm/:token', loggerMiddleware, SubscribeController.confirm);
router.get(
  '/unsubscribe/:token',
  loggerMiddleware,
  SubscribeController.unsubscribe,
);
router.post('/subscribe', loggerMiddleware, SubscribeController.subscribe);

export default router;
