var express = require('express');
var router = express.Router();

var usersRouter = require(`${__src}/users/routeUsers`);


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const routes = (app) => {
	app.use('/test', router);
	app.use('/', usersRouter);
};

module.exports = routes;
