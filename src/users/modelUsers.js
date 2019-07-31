const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	active_organization: {
		type: Schema.Types.ObjectId,
		ref: 'Organizations',
	},
	active_project: {
		type: Schema.Types.ObjectId,
		ref: 'Projects',
	},
	joined_organizations: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Organizations',
			default: [],
		}
	],
	owned_projects: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Projects',
			default: [],
		}
	],
	joined_projects: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Projects',
			default: [],
		}
	],
	is_active: {
		type: Boolean,
		default: true
	},
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
});

// hash user password before saving into database
// saltRounds = 10; (*from documentation example define a var to store the saltRound, i didnt do it because it's only use once here)
userSchema.pre('save', function(next) {
	bcrypt.hash(this.password, 10)
	.then(hash => {
		this.password = hash;

		next();
	});	
});

// remove password property after select from database, and before show it into controller
// userSchema.post('findOne', function(doc) {
// 	if (doc) delete doc.password;
// });

module.exports = mongoose.model('User', userSchema);