import Frequency from '@enums/frequency';
import Subscription from '@models/subscriptionModel';

class SubscriptionRepository {
  async findSubscriptionByEmail(email: string) {
    return await Subscription.findOne({ where: { email } });
  }

  async createSubscription(data: {
    email: string;
    frequency: string;
    city: string;
  }) {
    return await Subscription.create({
      ...data,
      confirmed: false,
    });
  }

  async deleteSubscription(email: string) {
    return await Subscription.destroy({ where: { email } });
  }

  async confirmSubscription(email: string) {
    return await Subscription.update({ confirmed: true }, { where: { email } });
  }

  async findSubscriptionsByFrequency(frequency: Frequency) {
    return await Subscription.findAll({
      where: { frequency, confirmed: true },
    });
  }
}

export default new SubscriptionRepository();
