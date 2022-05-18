import { Sequelize } from 'sequelize';
import Constants from '../constant/constants';

const sequelizeConnection = new Sequelize(`postgres://${Constants.DB_USERNAME}:${Constants.DB_PASSWORD}@${Constants.DB_HOST}:${Constants.DB_PORT}/${Constants.DB_NAME}`, { schema: Constants.DB_SCHEMA, logging: false });

export default sequelizeConnection;
