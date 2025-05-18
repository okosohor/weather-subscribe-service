import { Sequelize } from "sequelize";
import logger from "./logger";
import dotenv from 'dotenv';


dotenv.config();

//docker
const DB_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

//dev
// const DB_URL = 'postgres://postgres:postgres@localhost:5432/weatherdb'

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
});

const createDataBaseConection = async () => {
  logger.info(DB_URL)
  try {
    await sequelize.authenticate();
    logger.info('Connection with db');
  } catch (error) {
    logger.error('Connection lost' + error);
  }
};

export  { createDataBaseConection, sequelize };
