import { Router } from "express";
import user from "./routes/user/user.routes";

class Routes {

	public routes: Array<Router> = [];

	constructor() {
		this.init();
	}

	init() {
		this.routes.push(user);
	}

}

export = new Routes().routes;