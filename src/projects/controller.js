// model
const Project = require('./models/project');
const YoutubeLink = require('./models/youtubeLink');

// helpers
const generalHelper = require(`${__helpers}/generalHelper`);
const {
	success
} = require(`${__helpers}/responseHelper`);

// controller helper
const {
	h_updateUserProject,
	h_joinUserProject,
} = require(`${__src}/users/controller`);

class ProjectController {
	// ===== PROJECT
	 async projectsByOrganization(req, res) {
	 	const { organization_id } = req.params;

		Project.find({ organization_id })
		.lean()
		.then(projects => {
			res.status(200).send(projects);
		})
		.catch(err => {
			res.status(400).send(err);
		});
	};

	async insertProject(req, res) {
		const { user_id } = req; // assigned from middleware.auth as logged/current token user
		const { organization_id } = req.params;
		const { name, start_period, end_period } = req.body;
		const project_code = generalHelper.generateCode();

		const newProject = new Project({
			organization_id,
			project_code,
			name,
			start_period,
			end_period,
			members: [{ user_id, status: 1 }],
		});

		newProject.save()
		.then(created => {
			console.log(created, '======> CREATED PROJECT');
			return h_updateUserProject(user_id, created);
		})
		.then(updated => {
			console.log(updated, '======> UPDATED USER AFTER CREATED PROJECT');
			res.status(200).send(success('project'));
		})
		.catch(err => {
			res.status(400).send(err);
		});
	};

	// TODO : make middleware checking is same organization or not, already joined user, already assigned to members
	async joinProject(req, res) {
		const { user_id } = req; // assigned from middleware.auth as logged/current token user
		const { organization_id } = req.params;
		const { getProject } = req // assigned from middleware.checkAvailabilityJoin in projects/validation;

		getProject.members.push({ user_id, status: 2 });

		getProject.save()
		.then(updated => {
			console.log(updated, '=====> UPDATED PROJECT MEMBERS');
			return h_joinUserProject(user_id, updated);
		})
		.then(joined => {
			console.log(joined, '=====> UPDATED USER FOR JOINED PROJECT');
			res.status(200).send(success('joinProject', joined));
		})
		.catch(err => {
			res.status(400).send(err);
		});
	}

	// YOUTUBE
	async insertYoutubeLink(req, res) {
		const newLink = new YoutubeLink({
			project_id: '5d5bf51ebfa26156543933a6',
			name: 'don',
			embeded_url : 'https://youtu.be/JFEU6FHUWsY',
		});

		newLink.save()
		.then(created => {
			res.status(200).send(created);
		})
		.catch(err => {
			res.status(400).send(err);
		});
	};

	async youtubeLinksByProject(req, res) {
		YoutubeLink.find({ project_id: req.params.project_id })
		.lean()
		.sort('-created_at') //sort by newest created_at
		.then(links => {
			res.status(200).send(links);
		})
		.catch(err => {
			res.status(400).send(err);
		});
	};	
}

module.exports = new ProjectController();
