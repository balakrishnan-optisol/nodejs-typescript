import User from '../routes/user/user.model';

class migrateModels {

	async syncModels() {
		try {
			await User.sync({ alter: true });
		} catch (error) {
			console.log('syncModels error - ', error);
		}
	}
}

export default new migrateModels();