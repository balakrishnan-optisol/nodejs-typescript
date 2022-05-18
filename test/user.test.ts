import 'jest';
import supertest from 'supertest';
import app from '../src/App';
import sequelize from "../src/config/database";
import migrate from "../src/config/migrate";
import redis from "../src/utility/redis";
import 'dotenv/config';
import process from 'node:process';
import dotenv from 'dotenv';

beforeAll(async () => {

	dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
	await sequelize.authenticate();
	await migrate.syncModels();
	await redis.client.connect();
});

describe('GET user data api', () => {

	test('GET available user data by ID', async () => {
		const userId = 2;
		const res: supertest.Response = await supertest(app)
			.get(`/user/${userId}`)
			.set('Accept', 'application/json');
		expect(res.statusCode).toBe(200);
		expect(res.body.status).toEqual("success");
		expect(res.body.data.id).toBe(userId);
	});

	test('GET unavailable user data by ID', async () => {
		const userId = 1;
		const res: supertest.Response = await supertest(app)
			.get(`/user/${userId}`)
			.set('Accept', 'application/json');
		expect(res.statusCode).toBe(400);
		expect(res.body.status).toEqual("error");
		expect(res.body.data).not.toEqual({ id: userId });
	});

	test('GET user data by Empty ID', async () => {
		const userId = 0;
		const res: supertest.Response = await supertest(app)
			.get(`/user/${userId}`)
			.set('Accept', 'application/json');
		expect(res.statusCode).toBe(400);
		expect(res.body.status).toEqual("error");
	});

});

describe('GET user list api', () => {

	test('GET empty user list by search', async () => {
		const page = 1;
		const search = 'teatusersssss';
		const res: supertest.Response = await supertest(app)
			.get(`/user?page=${page}&search=${search}`)
			.set('Accept', 'application/json');
		expect(res.statusCode).toBe(400);
		expect(res.body.status).toEqual("error");
	});

	test('GET user list', async () => {
		const page = 1;
		const search = '';
		const res: supertest.Response = await supertest(app)
			.get(`/user?page=${page}&search=${search}`)
			.set('Accept', 'application/json');
		expect(res.statusCode).toBe(200);
		expect(res.body.status).toEqual("success");
		expect(res.body.data.length).toBeGreaterThan(0);
	});

});

describe('Add user api', () => {

	test('POST user add without first name', async () => {

		const res: supertest.Response = await supertest(app)
			.post(`/user`)
			.set('Accept', 'application/json')
			.send({
				last_name: "test",
				email: "teat@gmail.com"
			});
		expect(res.statusCode).toBe(400);
		expect(res.body.status).toEqual("error");
	});

	test('POST user add first name as number', async () => {

		const res: supertest.Response = await supertest(app)
			.post(`/user`)
			.set('Accept', 'application/json')
			.send({
				first_name: 10,
				last_name: "Test",
				email: "teat@gmail.com"
			});
		expect(res.statusCode).toBe(400);
		expect(res.body.status).toEqual("error");
	});

	test('POST user add email as number', async () => {

		const res: supertest.Response = await supertest(app)
			.post(`/user`)
			.set('Accept', 'application/json')
			.send({
				first_name: "Test",
				last_name: "1",
				email: 10
			});
		expect(res.statusCode).toBe(400);
		expect(res.body.status).toEqual("error");
	});

	test('POST user add last name as number', async () => {

		const res: supertest.Response = await supertest(app)
			.post(`/user`)
			.set('Accept', 'application/json')
			.send({
				first_name: "Test",
				last_name: 10,
				email: "teat@gmail.com"
			});
		expect(res.statusCode).toBe(400);
		expect(res.body.status).toEqual("error");
	});

	test('POST user add invalid email', async () => {

		const res: supertest.Response = await supertest(app)
			.post(`/user`)
			.set('Accept', 'application/json')
			.send({
				first_name: "Test",
				last_name: '',
				email: "teat"
			});
		expect(res.statusCode).toBe(400);
		expect(res.body.status).toEqual("error");
	});

	test('POST user add without email', async () => {

		const res: supertest.Response = await supertest(app)
			.post(`/user`)
			.set('Accept', 'application/json')
			.send({
				first_name: "test",
				last_name: "",
			});
		expect(res.statusCode).toBe(400);
		expect(res.body.status).toEqual("error");
	});

});

describe('DELETE user api', () => {

	test('DELETE user data by Empty ID', async () => {
		const res: supertest.Response = await supertest(app)
			.delete(`/user/0`)
			.set('Accept', 'application/json');
		expect(res.statusCode).toBe(400);
		expect(res.body.status).toEqual("error");
	});

});

describe('UPDATE user api', () => {

	test('UPDATE user data by Empty ID', async () => {
		const res: supertest.Response = await supertest(app)
			.put(`/user/0`)
			.set('Accept', 'application/json');
		expect(res.statusCode).toBe(400);
		expect(res.body.status).toEqual("error");
	});

});
