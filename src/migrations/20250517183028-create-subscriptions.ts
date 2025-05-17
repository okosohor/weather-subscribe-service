// import { QueryInterface, DataTypes } from 'sequelize';
// import seq from 'sequelize/types/query';

// export const up = async (queryInterface: QueryInterface): Promise<void> => {
//   await queryInterface.createTable('subscriptions', {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     subscription_type: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     confirmed: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     city: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//   });
// };

// export const down = async (queryInterface: QueryInterface): Promise<void> => {
//   await queryInterface.dropTable('subscriptions');
// };
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
        subscription_type: {
          type: DataTypes.STRING,
          allowNull: false,
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
