const _ = require('lodash');

const generalHelper = {};

// generete code length of generated code is 5 (five)
generalHelper.generateCode = () => {
	return Math.random().toString(36).substring(2, 7).toUpperCase();
};

module.exports = generalHelper;