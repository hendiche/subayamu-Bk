const jwt = require('jsonwebtoken');

const msgHelper = require(`${__helpers}/errorHandler`);
const User = require(`${__src}/users/model`);

const jwtSecret = process.env.JWT_SECRET_KEY;
const middleware = {};

// check token 
middleware.auth = async (req, res, next) => {
	const header = req.headers['x-access-token'];
	let token, secret;

	if (header && header.startsWith('Bearer ')) {
		const headers = header.split(' ');
		secret = headers[0].toLowerCase();
		token = headers[1];
	}

	if (!token) return res.status(401).json(msgHelper.errMsg('token is required'));

	jwt.verify(token, (jwtSecret+secret), (err, decoded) => {
		if (err) return res.status(401).json(msgHelper.errMsg('token is invalid!'));

		User.findById(decoded.id)
		.lean()
		.then(verifyUser => {
			req.user_id = verifyUser._id;
			// cannot use '===' mongoose returned id is ObjectId, while decoded id is String
			if (verifyUser._id == decoded.id) return next();

			// if decoded token user login_id is non in database
			res.status(401).json(msgHelper.errMsg('token is invalid!!'));
		})
		.catch(err => {
			res.status(403).json(msgHelper.errMsg('token is invalid'));
		});
	});
}

module.exports = middleware;