import { Response, NextFunction } from 'express';

class Utility {

	successRes(res: Response, code = 200, data?: any, meesage = 'Success!') {
		return res.status(code).json({
			code,
			status: 'success',
			meesage,
			data
		});
	}

	errorRes(res: Response, code = 400, error: any, meesage = 'Error!') {
		return res.status(code).json({
			code,
			status: 'error',
			meesage: error && error.message ? error.message : meesage
		});
	}

	validatedData(validatedData: any, res: Response, next: NextFunction) {

		if (validatedData && !validatedData.error) {
			return next();
		} else if (validatedData) {
			const errorMessage = validatedData.error && validatedData.error.details && validatedData.error.details.length > 0 && validatedData.error.details[0].message ? validatedData.error.details[0].message : '';
			return this.errorRes(res, 400, null, errorMessage);
		}
	}
}

export default new Utility();