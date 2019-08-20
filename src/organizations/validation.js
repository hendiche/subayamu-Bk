const Joi = require('@hapi/joi');
const errHelper = require(`${__helpers}/errorHandler`);
const { createOrganization } = require(`${__helpers}/msgCollection`);

const createOrgzValidation = async (req, res, next) => {
	const schema = Joi.object().keys({
		name: Joi.string()
		.required()
		.error(errs => {
			return errHelper.generateCustomizeErrMsg(errs, createOrganization.name);
		})
	});

	schema.validate(req.body, { abortEarly: false }, (err, value) => {
		if (err && err.details) {
			return res.status(422).json(errHelper.errMsg('', err.details.map((err) => err.message)));
		}

		next();
	});
};

module.exports = {
	createOrgzValidation,
}