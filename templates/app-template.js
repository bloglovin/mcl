/**
 * NAME OF PROJECT
 * @fileoverview 
 * @copyright 2013 Patrik Ring
 * @author Patrik Ring
 */

var express = require('express')
  , fs = require('fs')
  , mmm = require('mmm')
  , db = require('mongoose')

var app = express()

// Define assets
app.set('views', __dirname + '/views')
app.set('models', __dirname +'/models')
app.set('controllers', __dirname +'/controllers')
app.set('routes', __dirname +'/routes.json')

// General app
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(app.router)
app.use(express.compress())
app.use('/public', express.static('public'))
app.config = require('./config.json')[app.get('env')]

// Data stores
db.connect(app.config.mongo.url);

// Print errors in development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Templating
mmm.setEngine('hogan.js')
app.set('view engine', 'mustache')
app.engine('mustache', mmm.__express)

// Load models and controllers
var mcl = require('mcl')(app)
app.models = mcl.loadModels(fs, db)
mcl.loadRoutes(mcl.loadControllers(fs))

// Listen!
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));