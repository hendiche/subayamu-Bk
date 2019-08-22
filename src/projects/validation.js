const Joi = require('@hapi/joi');
const Project = require('./models/project');

// error handler helper
const {
	generateCustomizeErrMsg,
	errMsg,
} = require(`${__helpers}/errorHandler`);

// error customize message collections
const {
	addProject,
	joinProject,
	addYoutube,
} = require(`${__helpers}/msgCollection`);

class ProjectValidation {
	// TODO: validation, end_period must be 1 day higher than start_period
	async addProject(req, res, next) {
		const schema = Joi.object().keys({
			name: Joi.string()
				.required()
				.error(errs => {
					return generateCustomizeErrMsg(errs, addProject.name);
				}),
			start_period: Joi.date()
				.required()
				.error(errs => {
					return generateCustomizeErrMsg(errs, addProject.start_period);
				}),
			end_period: Joi.date()
				.required()
				.error(errs => {
					console.log(errs,"asd");
					return generateCustomizeErrMsg(errs, addProject.end_period);
				}),
		});

		schema.validate(req.body, { abortEarly: false }, (err, value) => {
			if (err && err.details) {
				return res.status(422).json(errMsg('', err.details.map((err) => err.message)));
			}

			next();
		});
	};

	async joinProject(req, res, next) {
		const schema = Joi.object().keys({
			project_code: Joi.string()
				.required()
				.error(errs => {
					return generateCustomizeErrMsg(errs, joinProject.project_code);
				}),
		});

		// check req.body field
		schema.validate(req.body, { abortEarly: false }, (err, value) => {
			if (err && err.details) {
				return res.status(422).send(errMsg('', err.details.map((err) => err.message)));
			}
		});

		const { user_id } = req; // assigned from middleware.auth as logged/current token user
		const { organization_id } = req.params;
		const { project_code } = req.body;

		const getProject = await Project.findOne({ project_code }).exec();

		// check if project not found by code, then response error
		if (!getProject) return res.status(400).send({ err: 'code wrong' });

		// check if project from organization and user same organization, if not then response error
		if (organization_id != getProject.organization_id) {
			return res.status(400).send({ err: 'not in same organization' });
		}

		// check if project already as member, then response error
		const joined = getProject.members.some((member) => {
			if (member.user_id.toString() == user_id.toString()) return member;
		});
		if (joined) return res.status(400).send({ err: 'already join' });

		req.getProject = getProject; // assign project, so there's no need to fetch once more in controller


		next();
	};

	async requireProjectId(req, res, next) {
		const { project_id } = req.params;

		// check if request have param of project_id, if not, response error
		if (!project_id) {
			return res.status(400).send({ err: 'project id required' });
		}

		next();
	}

	async addYoutubeLink(req, res, next) {
		const schema = Joi.object().keys({
			name: Joi.string()
				.required()
				.error(errs => {
					return generateCustomizeErrMsg(errs, addYoutube.name);
				}),
			embeded_url: Joi.string()
				.required()
				.uri()
				.error(errs => {
					return generateCustomizeErrMsg(errs, addYoutube.embeded_url);
				}),
			project_id: Joi.string()
				.required()
				.error(errs => {
					return generateCustomizeErrMsg(errs, addYoutube.project_id);
				}),
		});

		// check req.body field
		schema.validate(req.body, { abortEarly: false }, (err, value) => {
			if (err && err.details) {
				return res.status(422).send(errMsg('', err.details.map((err) => err.message)));
			}
		});

		const { project_id } = req.body;

		const getProject = await Project.findById(project_id).exec();

		// check if project not found, then response error
		if (!getProject) return res.status(400).send({ err: 'project not found' });

		next();
	}

	async requireYoutubeId(req, res, next) {
		const { youtube_id } = req.params;

		// check if request have param of youtube link id, if not, then response error
		if (!youtube_id) {
			return res.status(400).send({ err: 'youtube id is required' });
		}

		next();
	}

};

module.exports = new ProjectValidation();