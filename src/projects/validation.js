const Joi = require('@hapi/joi');
const errHelper = require(`${__helpers}/errorHandler`);
const { addProject } = require(`${__helpers}/msgCollection`);

const addProjectForm = async (req, res, next) => {
	const schema = Joi.object().keys({
		name: Joi.string()
			.required()
			.error(errs => {
				return errHelper.generateCustomizeErrMsg(errs, addProject.name);
			}),
		start_period: Joi.date()
			.required()
			.error(errs => {
				return errHelper.generateCustomizeErrMsg(errs, addProject.start_period);
			}),
		end_period: Joi.date()
			.required()
			.error(errs => {
				console.log(errs,"asd");
				return errHelper.generateCustomizeErrMsg(errs, addProject.end_period);
			}),
	});

	schema.validate(req.body, { abortEarly: false }, (err, value) => {
		if (err && err.details) {
			return res.status(422).json(errHelper.errMsg('', err.details.map((err) => err.message)));
		}

		next();
	});
}

module.exports = {
	addProjectForm,
};