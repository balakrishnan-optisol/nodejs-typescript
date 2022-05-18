import 'dotenv/config';
import process from 'node:process';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import app from './App';
import Constants from './constant/constants';
import cluster from 'node:cluster';
import { cpus } from 'node:os';

const noOfCpus: number = cpus().length;

if (cluster.isPrimary) {

	for (let i = 0; i < noOfCpus; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {

	app.listen(Constants.PORT, () => {
		return console.log(`server is listening on ${Constants.PORT}`);
	});
	console.log(`Worker ${process.pid} started`);
}
