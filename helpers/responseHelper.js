const _ = require('lodash');

// CONST TYPE OF RESPONSE
const CONST_TYPE_RES = {
	register: {
		msg: 'Successfully created a account',
	},
	project: {
		msg: 'Successfully created a project',
	},
	joinProject: {
		msg: 'Successfully joined to a project',
	},
	addDocs: {
		msg: 'Successfully added document to the project',
	},
	deleteDocs: {
		msg: 'Successfully deleted document',
	},
	addSlide: {
		msg: 'Successfully added slide link to the project',
	},
	deleteSlide: {
		msg: 'Successfully deleted slide',
	},
	addYoutube: {
		msg: 'Successfully added youtube link to the project',
	},
	deleteYoutube: {
		msg: 'Successfully deleted youtube link',
	},
};

// initial object structure
const successMessage = {
	success: true,
	msg: '',
	msgArr: [],
};
const responseHelper = {};

// 
responseHelper.success = (type, extraObj = {}) => {
	if (!type) throw new Error('ResponseHelper.success type parameter is required');

	const result = successMessage;


	if (extraObj && extraObj._id) {
		result.user = extraObj.toObject(); // required this API, coz mongoose is wrapped from a doc
	}
	
	result.msg = CONST_TYPE_RES[type].msg;

	return result;
}

module.exports = responseHelper;