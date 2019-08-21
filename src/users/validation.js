const Joi = require('@hapi/joi');
const errHelper = require(`${__helpers}/errorHandler`);
const { login } = require(`${__helpers}/msgCollection`);

class UserValidation {
	async loginValidation(req, res, next) {
		const schema = Joi.object().keys({
			email: Joi.string()
				.email({ minDomainSegments: 2 })
				.required()
				.error(errs => {
					return errHelper.generateCustomizeErrMsg(errs, login.email);
				}),
			password: Joi.string()
				.required()
				.error(errs => {
					return errHelper.generateCustomizeErrMsg(errs, login.password);
				}),
		});

		schema.validate(req.body, { abortEarly: false }, (err, value) => {
			if (err && err.details) {
				return res.status(422).json(errHelper.errMsg('', err.details.map((err) => err.message)));
			}

			next();
		});
	};

};



module.exports = new UserValidation();