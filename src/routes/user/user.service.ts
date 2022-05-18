import User from "./user.model";
import { Op } from "sequelize";

export const getUserList = async (page: number, limit: number, search: string) => {
	try {

		const offset = (page - 1) * limit;
		const userList = await User.findAll({
			where: {
				[Op.or]: [
					{
						first_name: {
							[Op.substring]: search
						}
					},
					{
						last_name: {
							[Op.substring]: search
						}
					}
				]
			},
			attributes: [
				['id', 'user_id'],
				'first_name',
				'last_name'
			],
			offset: offset,
			limit: limit
		});
		return userList;
	} catch (error) {
		throw error;
	}
};

export const getUser = async (userId: number) => {
	try {
		const userData = await User.findByPk(userId);
		return userData;
	} catch (error) {
		throw error;
	}
};

export const addUser = async (userData: User) => {
	try {
		const createdData = await User.create(userData);
		return createdData;
	} catch (error) {
		throw error;
	}
};

export const updateUser = async (userId: number, userData: User) => {
	try {
		const updatedData = await User.update(userData, { where: { id: userId } });
		return updatedData;
	} catch (error) {
		throw error;
	}
};

export const deleteUser = async (userId: number) => {
	try {
		await User.destroy({
			where: {
				id: userId
			}
		});
		return;
	} catch (error) {
		throw error;
	}
};
