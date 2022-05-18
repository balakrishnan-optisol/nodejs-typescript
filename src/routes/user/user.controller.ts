import { Request, Response } from 'express';
import Utility from '../../utility/utility';
import * as service from './user.service';
import Constants from '../../constant/constants';

export const getUserList = async (req: Request, res: Response) => {
	try {
		const bodyData = req.query;
		const page: number = bodyData && bodyData.page && Number(bodyData.page) ? Number(bodyData.page) : 1;
		const limit: number = bodyData && bodyData.limit && Number(bodyData.limit) ? Number(bodyData.limit) : Constants.PAGE_LIMIT;
		const search: string = bodyData && bodyData.search && String(bodyData.search) ? String(bodyData.search) : '';

		const userList = await service.getUserList(page, limit, search);
		if(!userList || userList.length < 1){
			return Utility.errorRes(res, 400, null, "No user found.");
		}

		return Utility.successRes(res, 200, userList, 'User list fetched successfully!');
	} catch (error) {
		return Utility.errorRes(res, 400, error);
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const userId: number = req.params && req.params.id && Number(req.params.id) ? Number(req.params.id) : 0;
		if (!userId) {
			return Utility.errorRes(res, 400, null, "User ID required to fetch data.");
		}

		const userData = await service.getUser(userId);
		if (!userData) {
			return Utility.errorRes(res, 400, null, "User not found.");
		}

		return Utility.successRes(res, 200, userData, 'User data fetched successfully!');
	} catch (error) {
		return Utility.errorRes(res, 400, error);
	}
};

export const addUser = async (req: Request, res: Response) => {
	try {
		const bodyData = req.body;
		const createdData = await service.addUser(bodyData);
		return Utility.successRes(res, 200, createdData, 'User added successfully!');
	} catch (error) {
		return Utility.errorRes(res, 400, error);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const bodyData = req.body;
		const userId: number = req.params && req.params.id && Number(req.params.id) ? Number(req.params.id) : 0;
		if (!userId) {
			return Utility.errorRes(res, 400, null, "User ID required to update data.");
		}

		const updatedData = await service.updateUser(userId, bodyData);
		return Utility.successRes(res, 200, updatedData, 'User updated successfully!');
	} catch (error) {
		return Utility.errorRes(res, 400, error);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const userId: number = req.params && req.params.id && Number(req.params.id) ? Number(req.params.id) : 0;
		if (!userId) {
			return Utility.errorRes(res, 400, null, "User ID required to delete user.");
		}

		await service.deleteUser(userId);
		return Utility.successRes(res, 200, null, 'User deleted successfully!');
	} catch (error) {
		return Utility.errorRes(res, 400, error);
	}
};