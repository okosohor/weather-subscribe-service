import logger from '@config/logger';
import axios from 'axios';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.WEATHER_API_URL || '';

class WeatherService {
  async getCurrentWeather(city: string) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: WEATHER_API_KEY,
          q: city,
          aqi: 'no',
        },
      });

      const data = response.data;

      return {
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        description: data.current.condition.text,
        city: data.location.name,
      };
    } catch (error: any) {
      logger.error('Weather service error, not found' + error.response);
      if (error.response && error.response.status === 400) {
        return null;
      }

      logger.error('Weather service error' + error.response);
      throw new Error('Weather service error');
    }
  }
}

export default new WeatherService();
