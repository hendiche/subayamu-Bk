const mongoose = require('mongoose');
const Organizations = require('./organizations/model');
const Users = require('./users/model');

const seeder = async (req, res) => {
	const initUser = new Users({
		name: 'adminBIT',
		email: 'bit@admin.com',
		password: 'bit@okutama594',
	});

	initUser.save()
	.then(cr8User => {
		const initOrgz = new Organizations({
			creator_id: cr8User._id,
			organization_code: 'BIT594',
			name: 'BIT Okutama',
			members: [],
		});

		initOrgz.save()
		.then(cr8Orgz => { res.status(200).send({ user: cr8User, orgz: cr8Orgz }); })
		.catch(err => { res.status(422).send(err); });
	})
	.catch(err => { res.status(422).send(err); });
}

module.exports = seeder;