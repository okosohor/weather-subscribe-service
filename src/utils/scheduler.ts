import cron from 'node-cron';
import subscriptionService from '@services/subscriptionService';
import WeatherService from '@services/weatherService';
import MailService from '@services/mailService';
import Frequency from '@enums/frequency';
import logger from '@config/logger';

async function startScheduler(frequency: Frequency) {
  const subscriptions =
    await subscriptionService.getSubscriptionsByFrequency(frequency);

  for (const item of subscriptions) {
    try {
      const weather = await WeatherService.getCurrentWeather(item.city);

      if (weather) {
        await MailService.sendWeatherMail(
          item.email,
          weather.temperature,
          weather.humidity,
          weather.description,
        );
      } else {
        logger.error('mail was not sent, weather not found');
      }
    } catch (err) {
      logger.error(`Failed to send weather to ${item.email}`, err);
    }
  }
}

function initSchedulers() {
  logger.info('cron start');
  cron.schedule('0 * * * *', async () => {
    logger.info('Start every hour min scheduler');
    await startScheduler(Frequency.hourly);
  });

  cron.schedule('0 10 * * *', async () => {
    logger.info('Start every day scheduler');
    await startScheduler(Frequency.daily);
  });

  logger.info('Schedulers initialized');
}

export default initSchedulers;
