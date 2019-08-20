const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
	creator_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	organization_code: {
		type: String,
		require: true,
		unique: true,
	},
	name: {
		type: String,
		require: true,
	},
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
			default: [],
		}
	],
	is_active: {
		type: Boolean,
		default: true,
	},
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
});

module.exports = mongoose.model('Organization', organizationSchema);