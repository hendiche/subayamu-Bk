const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	status: {
		type: Number,
		require: true,
	},
});

const projectSchema = new Schema({
	organization_id: {
		type: Schema.Types.ObjectId,
		ref: 'Organization',
	},
	project_code: {
		type: String,
		require: true,
		unique: true,
	},
	name: {
		type: String,
		require: true,
	},
	start_period: {
		type: Date,
		require: true,
	},
	end_period: {
		type: Date,
		require: true,
	},
	members: [memberSchema],
	is_active: {
		type: Boolean,
		default: true,
	},
}, {
	timestamps: {
		createAt: 'created_at',
		updatedAt: 'updated_at',
	}
});

module.exports = mongoose.model('Project', projectSchema);