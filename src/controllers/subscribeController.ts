// import logger from '@config/logger';
import logger from '@config/logger';
import Frequency from '@enums/frequency';
import MailService from '@services/mailService';
import { Request, Response } from 'express';

class SubscribeController {
  async subscribe(req: Request, res: Response) {
    try {
      if (!req.body) {
        logger.warn('Invalid input: empty body')
        res.status(400).json({ message: 'Invalid input' });
        return;
      }

      logger.info('Subscribe body'+JSON.stringify(req.body))
      const { email, city, frequency } = req.body;

      if (
        !email ||
        !city ||
        !frequency ||
        (frequency !== Frequency.daily && frequency !== Frequency.hourly)
      ) {
        logger.warn('Invalid input')
        res.status(400).json({ message: 'Invalid input' });
        return;
      }

      MailService.sendConfirmationMail(email, 'http://localhost:3000')

      res
        .status(200)
        .json({ message: 'Subscription successful. Confirmation email sent.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new SubscribeController();
