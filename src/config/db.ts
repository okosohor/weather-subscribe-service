import { Sequelize } from "sequelize";
import logger from "./logger";
import dotenv from 'dotenv';


dotenv.config();


const DB_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
});

const createDataBaseConection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection with db');
  } catch (error) {
    logger.error('Connection lost' + error);
  }
};

export  { createDataBaseConection, sequelize };
