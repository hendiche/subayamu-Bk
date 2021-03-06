var express = require('express');
var test = express.Router();
var routerV1 = express.Router();
var cors = require('cors');

const userController = require(`${__src}/users/controller`);

const middleware = require(`${__helpers}/middleware`);
const userValidation = require(`${__src}/users/validation`);

const usersRouter = require(`${__src}/users/route`);
const organizationsRouter = require(`${__src}/organizations/route`);
const projectRouter = require(`${__src}/projects/route`);


test.get('/', function(req, res, next) {
	userController.h_updateUserProject('5d35702fe2434e2cd01cbba1', { _id: '5d5ca31a8213ae2ee02c51a3' });
  res.render('index', { title: 'Express' });
});

// ===== seeder
const seeder = require(`${__src}/seeder`);
routerV1.post('/seederBIT', seeder);
// ===== /seeder
// public child routes 
routerV1.post('/login', userValidation.loginValidation, userController.login);
routerV1.post('/register', userValidation.registerValidation, userController.insertUser);

// private child routers -> need middleware auth token
routerV1.use('/users', middleware.auth, usersRouter);
routerV1.use('/organizations', middleware.auth, organizationsRouter);
routerV1.use('/projects', middleware.auth, projectRouter);


const routes = (app) => {
	app.use(cors());
	app.use('/test', test);

	app.use('/api/v1', routerV1);
};

module.exports = routes;
