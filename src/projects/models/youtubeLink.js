const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const youtubeLinkSchema = new Schema({
	project_id: {
		type: Schema.Types.ObjectId,
		ref: 'Project',
	},
	name: {
		type: String,
		require: true,
	},
	embeded_url: {
		type: String,
		require: true,
	},
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
});

module.exports = mongoose.model('Youtube_Link', youtubeLinkSchema);