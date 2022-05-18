import CommonConstants from "./common.constants";
import DatabaseConstants from "./database.constants";

class Constants {

	public constantObj: any;
	constructor() {
		this.init();
	}

	init() {
		this.constantObj = { ...CommonConstants, ...DatabaseConstants };
	}
}

export default new Constants().constantObj;