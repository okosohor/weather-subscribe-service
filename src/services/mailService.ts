import nodemailer from 'nodemailer';
import generateConfimMail from '@templates/confirmEmailTemplate';
import logger from '@config/logger';
import generateWeatherMail from '@templates/weatherEmailTemplate';
import dotenv from 'dotenv';

dotenv.config()

const user = process.env.NODE_MAILER_EMAIL;
const pass = process.env.NODE_MAILER_APP_PASSWORD
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
  port: 465,
  host: "smtp.gmail.com"

});

class MailService {
  
  async sendConfirmationMail(customerEmail: string, url: string) {
    const confrimMail = generateConfimMail(url);
    try {
      const response = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: 'Confirm your subscribe',
        html: confrimMail,
      });

      logger.info('Confirm email sent:', response);
    } catch (error) {
      logger.error('Send confirm mail error:', error);
    }
  }

  async sendWeatherMail(
    customerEmail: string,
    temperature: number,
    humidity: number,
    description: string,
    city: string,
  ) {
    const weatherMail = generateWeatherMail(
      temperature,
      humidity,
      description,
      city,
    );

    try {
      const response = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: `Weather Update for ${city}`,
        html: weatherMail,
      });

      logger.info('Weather email sent:', response);
    } catch (error) {
      logger.error('Send weather mail error:', error);
    }
  }
}

export default new MailService();
