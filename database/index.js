var mongoose = require('mongoose');

/** 
 * if there's other options database, 
 * Please create configuration under database/<DB_NAME>
 * then require that file here
 */

const database = {};
const connectionString = process.env.MONGO_CONNECTION_STRING;
// connection options used for remove the warning because of Deprecation Warnings from mongoose v5.6.10
// *more info : https://mongoosejs.com/docs/deprecations.html
const connectionOptions = {
	useNewUrlParser: true, // connection url parser string
	useCreateIndex: true, // indexes in mongoose schemas
	useFindAndModify: false, // deprecated function query
};

database.connect = () => {
	return mongoose.connect(connectionString, connectionOptions);
}

module.exports = database;