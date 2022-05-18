export default {
	DB_HOST: process.env.DB_HOST || 'localhost',
	DB_PORT: process.env.DB_PORT || '5432',
	DB_USERNAME: process.env.DB_USERNAME || 'postgres',
	DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
	DB_NAME: process.env.DB_NAME || 'database',
	DB_SCHEMA: process.env.DB_SCHEMA || 'node-typescript'
};
