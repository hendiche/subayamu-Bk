const _ = require('lodash');

// CONST TYPE OF RESPONSE
const CONST_TYPE_RES = {
	project: {
		msg: 'Successfully created a project',
	},
	joinProject: {
		msg: 'Successfully joined to a project',
	},
};

// initial object structure
const successMessage = {
	success: true,
	msg: ''
};
const responseHelper = {};

// 
responseHelper.success = (type = '', extraObj = {}) => {
	const result = successMessage;


	if (extraObj && extraObj._id) {
		result.user = extraObj.toObject(); // required this API, coz mongoose is wrapped from a doc
	}
	
	result.msg = CONST_TYPE_RES[type].msg;

	return result;
}

module.exports = responseHelper;