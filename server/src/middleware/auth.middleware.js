import jwt from "jsonwebtoken";
import appConfig from "../config/env";
import { UserModel } from "../module/user/user.model";

const auth = async (req, res, next) => {
	const authHeader = req.header("authorization");
	const token = authHeader && authHeader.split(' ')[1];

	if (token) {
		try {
			const decoded = jwt.verify(token, appConfig.jwt_key);
			const user = await UserModel.findOne({
				_id: decoded.sub,
			});
			if (!user) {
				return res.status(401).send({
					status: "ERROR",
					message: "Auth-Token is not valid",
				});
			}
			req.token = token;
			req.user = user;
			next();
		} catch (e) {
			return res.status(401).send({
				status: "ERROR",
				message: "Auth-Token is not valid",
			});
		}
	} else {
		return res.status(401).send({
			status: "ERROR",
			message: "Auth-Token not set in header",
		});
	}
};

export default auth;
