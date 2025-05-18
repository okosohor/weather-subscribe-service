import logger from '@config/logger';
import Frequency from '@enums/frequency';
import SubscriptionRepository from '@repositories/subscriptionRepository';
import MailService from '@services/mailService';

class SubscriptionService {
  async findByEmail(email: string) {
    try {
      return await SubscriptionRepository.findSubscriptionByEmail(email);
    } catch (error) {
      logger.error('SubscriptionService error find by email' + error);
      throw error;
    }
  }

  async create(data: { email: string; frequency: string; city: string }) {
    try {
      return await SubscriptionRepository.createSubscription(data);
    } catch (error) {
      logger.error('SubscriptionService error  create:' + error);
      throw error;
    }
  }

  async delete(email: string) {
    try {
      return await SubscriptionRepository.deleteSubscription(email);
    } catch (error) {
      logger.error('SubscriptionService error delete' + error);
      throw error;
    }
  }

  async confirm(email: string) {
    try {
      return await SubscriptionRepository.confirmSubscription(email);
    } catch (error) {
      logger.error('SubscriptionService error confirm' + error);
      throw error;
    }
  }

  async createAndSendConfirmation(data: {
    email: string;
    city: string;
    frequency: Frequency;
  }) {
    const existing = await this.findByEmail(data.email);
    if (existing) {
      return existing;
    }

    await this.create(data);

    await MailService.sendConfirmationMail(data.email);

    return null;
  }

  async getSubscriptionsByFrequency(frequency: Frequency) {
    return await SubscriptionRepository.findSubscriptionsByFrequency(frequency);
  }
}

export default new SubscriptionService();
