var _ = require('lodash');

const errorMessage = {
	success: false,
	msg: '',
	msgArr: [],
};
const errorHandler = {};

errorHandler.errMsg = (msg = '', msgArr = []) => {
	errorMessage.msg = msg;
	errorMessage.msgArr = msgArr;
	return errorMessage;
};

errorHandler.generateCustomizeErrMsg = (errs, errMsgs) => {
	errs.forEach(err => {
		const foundedMsg = _.find(errMsgs, (val) => { return val.type === err.type });
		if (foundedMsg) {
			err.message = foundedMsg.message;
		}
	});

	return errs;
};

module.exports = errorHandler;