// HELPER FOR SAME ERROR MESSAGE 
// required is where object key is not given, there's not value at all
const required = (fieldName) => {
	const msg = {
		type: 'any.required',
		message: fieldName + ' is required!',
	};

	return msg;
}

// empty is where object key is there but no value, the value is ""
const empty = (fieldName) => {
	const msg = {
		type: 'any.empty',
		message: fieldName + ' is required!!',
	};

	return msg;
}



// ============ USER
const login = {
	email: [
		required('Email'),
		empty('Email'),
		{
			type: 'string.email',
			message: 'Email format is not valid',
		},
	],
	password: [
		required('Password'),
		empty('Password'),
	],
};

// ========== ORGANIZATION
const createOrganization = {
	name: [
		required('Name'),
		empty('Name'),
	],
};

// ======== PROJECT
const addProject = {
	name: [
		required('Name'),
		empty('Name'),
	],
	start_period: [
		required('Start period'),
		{
			type: 'date.base',
			message: 'Start period must be a number of milliseconds or valid date string',
		},
	],
	end_period: [
		required('End period'),
		{
			type: 'date.base',
			message: 'End period must be a number of milliseconds or valid date string',
		},
	],
};

const joinProject = {
	project_code: [
		required('Project code'),
		empty('Project code'),
	],
};

const addYoutube = {
	name: [
		required('name'),
		empty('name'),
	],
	embeded_url: [
		required('Embeded url'),
		empty('Embeded url'),
		{
			type: 'string.uri',
			message: 'Embeded url must be a valid URL',
		},
	],
	project_id: [
		required('Project id'),
		empty('Project id'),
	],
};


module.exports = {
	login,
	createOrganization,
	addProject,
	joinProject,
	addYoutube,
};