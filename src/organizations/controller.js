const Organizations = require('./model');

class OrganizationController {
	async getAllOrgz(req, res) {
		Organizations.find()
		.lean()
		.then(organizations => {
			res.status(200).send(organizations);
		})
		.catch(err => {
			res.status(400).send(err);
		});	
	};

	async insertOrgz(req, res) {
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

	// ======== ORGANIZATION CONTROLLER HELPER
	// CREATED USER DEFAULT JOINING ORGANIATION BIT, FOR TEMPORARY
	h_createdUserJoinOrgz(user) {
		return new Promise(async (resolve, reject) => {
			const orgz = await Organizations.findById('5d5bbc7048eb715668303724').exec();

			orgz.members.push(user._id);

			orgz.save()
			.then(updatedOrgz => {
				console.log(updatedOrgz, "updatedOrgz");
				resolve(true);
			})
			.catch(err => {
				console.log("failed updatedOrgz");
				reject(err);
			});
		});
	}
}

module.exports = new OrganizationController();