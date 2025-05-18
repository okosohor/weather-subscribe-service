import { sequelize } from '@config/db';
import { Model, DataTypes } from 'sequelize';

class Subscription extends Model {
  public id!: number;
  public email!: string;
  public frequency!: string;
  public confirmed!: boolean;
  public city!: string;
}

Subscription.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['hourly', 'daily']],
      },
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Subscription',
    tableName: 'subscriptions',
    timestamps: false,
  },
);

export default Subscription;
