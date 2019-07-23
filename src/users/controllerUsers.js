const User = require('./modelUsers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET_KEY;

const getAllUsers = async (req, res) => {
	User.find()
	.select('-password')
	.lean()
	.then(users => {
		res.status(200).send(users);
	})
	.catch(err => {
		res.status(400).send(err);
	});
};

const insertUser = async (req, res) => {
	const newUser = new User({
		name: 'asd',
		email: 'asd@mail.com',
		login_id: 123456,
		password: 'asd'
	});

	newUser.save()
	.then(created => {
		res.status(200).send(users);
	})
	.catch(err => {
		res.status(400).send(err);
	});
};

const login = async (req, res, next) => {
	const { login_id, password } = req.body;

	User.findOne({ login_id })
	.then(oneUser => {
		bcrypt.compare(password, oneUser.password)
		.then(compared => {
			if (!compared) next(err);

			const payload = { id: oneUser._id, login_id: oneUser.login_id };
			const token = jwt.sign(payload, (jwtSecret+'bearer'), { expiresIn: '30days' });

			res.status(200).json({test: token});
		});
	})
	.catch(err => {
		console.log(err ,'error');
		res.status(400).send(err);
	})
}

module.exports = {
	getAllUsers,
	insertUser,
	login,
};