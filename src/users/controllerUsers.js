const User = require('./modelUsers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const msgHelper = require(`${__helpers}/errorHandler`);

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
	const { email, password } = req.body;

	User.findOne({ email })
	.lean()
	.then(oneUser => {
		bcrypt.compare(password, oneUser.password)
		.then(compared => {
			if (!compared) return res.status(400).send(msgHelper.errMsg('Email or password not valid'));

			const token = jwt.sign({ id: oneUser._id }, (jwtSecret+'bearer'), { expiresIn: '30days' });

			const resBody = {
				token: token,
				user: oneUser,
			};
			delete resBody.user.password;
			res.status(200).json(resBody);
		});
	})
	.catch(err => {
		console.log(err ,'error');
		res.status(400).send(msgHelper.errMsg('Email or password not valid'));
	})
}

module.exports = {
	getAllUsers,
	insertUser,
	login,
};