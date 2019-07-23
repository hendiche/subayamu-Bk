const errorMessage = {
	success: false,
	msg: '',
	msgArr: [],
};
const errorHandler = {};

errorHandler.errMsg = () => {
	errorMessage.msg = 'asd';
	return errorMessage;
};

module.exports = errorHandler;