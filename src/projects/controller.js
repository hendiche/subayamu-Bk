const Project = require('./models/project');
const YoutubeLink = require('./models/youtubeLink');

const generalHelper = require(`${__helpers}/generalHelper`);

// ===== PROJECT
const projectsByOrganization = async (req, res) => {
	Project.find({ organization_id: req.params.organization_id })
	.lean()
	.then(projects => {
		res.status(200).send(projects);
	})
	.catch(err => {
		res.status(400).send(err);
	});
};

const insertProject = async (req, res) => {
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
		res.status(200).send(created);
	})
	.catch(err => {
		res.status(400).send(err);
	});
};

// YOUTUBE
const insertYoutubeLink = async (req, res) => {
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

const youtubeLinksByProject = async (req, res) => {
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

module.exports = {
	projectsByOrganization,
	insertProject,
	insertYoutubeLink,
	youtubeLinksByProject,
}
