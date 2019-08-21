const User = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const msgHelper = require(`${__helpers}/errorHandler`);

const jwtSecret = process.env.JWT_SECRET_KEY;

class UserController {
	async getAllUsers(req, res) {
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

	async insertUser (req, res) {
		const newUser = new User({
			name: 'asd',
			email: 'asd@mail.com',
			password: 'asd'
		});

		newUser.save()
		.then(created => {
			res.status(200).send(created);
		})
		.catch(err => {
			res.status(400).send(err);
		});
	};

	async login (req, res, next) {
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
	};


	// ========= USER CONTROLLER HELPER
	// CREATED PROJECT FOR SELF AND UPDATE OWNED_PROJECT
	h_updateUserProject(user_id, project) {
		return new Promise(async (resolve, reject) => {
			const user = await User.findById(user_id).exec();

			user.owned_projects.push(project._id);
			user.active_project = project._id;

			user.save()
			.then(updatedUser => resolve(updatedUser))
			.catch(err => reject(err));
		});
	};

	// UPDATED PROJECT FOR JOINED_PROJECT
	h_joinUserProject(user_id, project) {
		return new Promise(async (resolve, reject) => {
			const user = await User.findById(user_id).exec();
			console.log(user, "asdasd");

			user.joined_projects.push(project._id);

			user.save()
			.then(updatedUser => resolve(updatedUser))
			.catch(err => reject(err));
		});
	};

};

module.exports = new UserController();