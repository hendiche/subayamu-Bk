const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new Schema({
	project_id: {
		type: Schema.Types.ObjectId,
		ref: 'Project'
	},
	name: {
		type: String,
		require: true,
	},
	body: {
		type: String,
		require: true,
		default: '',
	},
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
});

module.exports = mongoose.model('Documents', documentSchema);