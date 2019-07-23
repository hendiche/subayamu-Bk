const jwt = require('jsonwebtoken');

const User = require(`${__src}/users/modelUsers`);

const jwtSecret = process.env.JWT_SECRET_KEY;
const middleware = {};

// check token 
middleware.auth = async (req, res, next) => {
	const header = req.headers['x-access-token'];
	let token, secret;

	if (header.startsWith('Bearer ')) {
		const headers = header.split(' ');
		secret = headers[0].toLowerCase();
		token = headers[1];
	}

	if (!token) return res.status(401).json({ success: false, msg: 'token is required' });

	jwt.verify(token, (jwtSecret+secret), (err, decoded) => {
		if (err) return res.status(401).json({ success: false, msg: 'token is invalid!' });

		User.findOne({ login_id: decoded.login_id })
		.lean()
		.then(verifyUser => {
			if (verifyUser.login_id === decoded.login_id) return next();

			// if decoded token user login_id is non in database
			res.status(401).json({ success: false, msg: 'token is invalid!!' });
		})
		.catch(err => {
			res.status(403).json({ success: false, msg: 'token is invalid' });
		});
	});
}

module.exports = middleware;