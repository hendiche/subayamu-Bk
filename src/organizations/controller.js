const Organizations = require('./model');

const getAllOrgz = async (req, res) => {
	Organizations.find()
	.lean()
	.then(organizations => {
		res.status(200).send(organizations);
	})
	.catch(err => {
		res.status(400).send(err);
	});
};

const insertOrgz = async (req, res) => {
	const newOrgz = new Organizations({
		creator_id: req.user_id, // assigned from middleware as logged/current token user
		organization_code: 'DWF1D',
		name: 'orgz 1',
		members: [req.user_id]
	});

	newOrgz.save()
	.then(created => {
		res.status(200).send(created);
	})
	.catch(err => {
		res.status(400).send(err);
	})
};

module.exports = {
	getAllOrgz,
	insertOrgz,
}