const login = {
	email: [
		{
			type: 'any.required',
			message: 'Email is required',
		},
		{
			type: 'any.empty',
			message: 'Email is required',
		},
		{
			type: 'string.email',
			message: 'Email format is not valid',
		},
	],
	password: [
		{
			type: 'any.required',
			message: 'Password is required',
		},
		{
			type: 'any.empty',
			message: 'Password is required',
		}
	],
};


module.exports = {
	login,
};