const _ = require('lodash');

const helpers = {};

// generete code length of generated code is 5 (five)
helpers.generateCode = () => {
	return Math.random().toString(36).substring(2, 7).toUpperCase();
}

module.exports = helpers;