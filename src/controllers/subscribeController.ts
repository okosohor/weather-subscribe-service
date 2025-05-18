// import logger from '@config/logger';
import logger from '@config/logger';
import Frequency from '@enums/frequency';
import mailService from '@services/mailService';
import SubscriptionService from '@services/subscriptionService';
import { verifyToken } from '@utils/token';
import { Request, Response } from 'express';
import WeatherService from '@services/weatherService';

class SubscribeController {
  async subscribe(req: Request, res: Response) {
    try {
      if (!req.body) {
        logger.warn('Invalid input: empty body');
        res.status(400).json({ message: 'Invalid input' });
        return;
      }

      logger.info('Subscribe body' + JSON.stringify(req.body));
      const { email, city, frequency } = req.body;

      if (
        !email ||
        !city ||
        !frequency ||
        (frequency !== Frequency.daily && frequency !== Frequency.hourly)
      ) {
        logger.warn('Invalid input');
        res.status(400).json({ message: 'Invalid input' });
        return;
      }

      //check if city correct
      const weather = await WeatherService.getCurrentWeather(city);
      logger.info('weather', weather);
      if (!weather) {
        logger.warn('Invalid input');
        res.status(400).json({ message: 'Invalid input' });
        return;
      }

      const subscritionIsCreated =
        await SubscriptionService.createAndSendConfirmation({
          email,
          city,
          frequency,
        });

      if (subscritionIsCreated) {
        res.status(409).json({ message: 'Email already subscribed' });
        return;
      }

      res
        .status(200)
        .json({ message: 'Subscription successful. Confirmation email sent.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async confirm(req: Request, res: Response) {
    logger.info('token', req.query);
    try {
      const { token } = req.params;

      if (!token || typeof token !== 'string') {
        res.status(400).json({ message: 'Missing or invalid token' });
        return;
      }

      const email = verifyToken(token);

      if (!email) {
        res.status(404).json({ message: 'Token not found' });
        return;
      }

      await SubscriptionService.confirm(email);
      await mailService.sendUnsubscribeMail(email);

      res.status(200).json({ message: 'Subscription confirmed successfully' });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async unsubscribe(req: Request, res: Response) {
    logger.info('token', req.query);
    try {
      const { token } = req.params;

      if (!token || typeof token !== 'string') {
        res.status(400).json({ message: 'Missing or invalid token' });
        return;
      }

      const email = verifyToken(token);

      if (!email) {
        res.status(404).json({ message: 'Token not found' });
        return;
      }

      await SubscriptionService.delete(email);

      res.status(200).json({ message: 'Unsubscribed successfully' });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new SubscribeController();
