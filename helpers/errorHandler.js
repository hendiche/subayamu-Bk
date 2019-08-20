var _ = require('lodash');

const errorMessage = {
	success: false,
	msg: '',
	msgArr: [],
};
const errorHandler = {};

// TODO 1: change to only 1 param, auto check if array then assign to msgArr, if string assing to msg
// TODO 2: if there's 2 param, (2 param != null/undefined) then do TODO 1
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