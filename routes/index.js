var express = require('express');
var test = express.Router();
var routerV1 = express.Router();

const middleware = require(`${__helpers}/middleware`);

const UserController = require(`${__src}/users/controllerUsers`);

const usersRouter = require(`${__src}/users/routeUsers`);


test.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// public child routes 
routerV1.post('/login', UserController.login);

// private child routers -> need middlaware auth token
routerV1.use('/users', middleware.auth, usersRouter);



const routes = (app) => {
	app.use('/test', test);

	app.use('/api/v1', routerV1);
};

module.exports = routes;
