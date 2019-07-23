var mongoose = require('mongoose');

/** 
 * if there's other options database, 
 * Please create configuration under database/<DB_NAME>
 * then require that file here
 */

const database = {};
const connectionString = process.env.MONGO_CONNECTION_STRING;

database.connect = () => {
	return mongoose.connect(connectionString, {useNewUrlParser: true});
}

module.exports = database;