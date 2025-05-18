import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('subscriptions', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
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
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('subscriptions');
  },
};
