import { Request, Response } from 'express';
import WeatherService from '@services/weatherService';
import logger from '@config/logger';

class WeatherContoller {
  async getWeather(req: Request, res: Response) {
    logger.info(req.query.city);
    try {
      const { city } = req.query;

      if (!city || typeof city !== 'string') {
        res.status(400).json({ message: 'Invalid request' });
        return;
      }

      const weather = await WeatherService.getCurrentWeather(city);
      if (!weather) {
        res.status(404).json({ message: 'City not found' });
        return;
      }

      res.status(200).json({
        ...weather,
      });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new WeatherContoller();
