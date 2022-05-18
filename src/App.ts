import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import sequelize from "./config/database";
import migrate from "./config/migrate";
import { Request, Response } from 'express';
import redis from "./utility/redis";
import utility from "./utility/utility";

class App {

	public express;

	constructor() {
		this.express = express();
		this.init();
	}

	async init() {
		try {
			await this.initDatabase();
			this.middleware();
			this.addRoutes();
			this.errorHandler();
		} catch (error) {
			console.log('init error - ', error);
		}
	}

	async initDatabase() {
		try {
			await sequelize.authenticate();
			await migrate.syncModels();
			await redis.client.connect();
		} catch (error) {
			console.log('initDatabase error - ', error);
		}
	}

	middleware(): void {
		try {
			this.express.use(morgan('dev'));
			this.express.use(express.json());
			this.express.use(express.urlencoded({ extended: true }));
			this.express.use(cors());
			this.express.use(helmet());
		} catch (error) {
			console.log('middleware error - ', error);
		}
	}

	addRoutes(): void {
		try {
			for (let i = 0; i < routes.length; i++) {
				const route = routes[i];
				this.express.use('/', route);
			}
		} catch (error) {
			console.log('addRoutes error - ', error);
		}
	}

	errorHandler(): void {
		try {
			this.express.get("/redis", async (req: Request, res: Response) => {
				try {
					const result = await redis.options();
					utility.successRes(res, 200, result);
				} catch (error) {
					utility.errorRes(res, 404, error);
				}
			});
			this.express.use((req: Request, res: Response) => {
				utility.errorRes(res, 404, null, "Not Found");
			});
		} catch (error) {
			console.log('errorHandler error - ', error);
		}
	}

}

export default new App().express;
