mcl
=========

A simple script to help load models and controllers dynamically

Install:

npm install

Create the following folders: 
PROJECT/controllers
PROJECT/models

Create the file routes.json, example

{
  "/route": {
    "http-method":"controller-name.method"
  },
  "/": {
    "get":"index.view",
    "post":"index.add"
  }
}

Example model

module.exports = {
  schema: {
    createdAt: {
      type: Date,
      required: true,
      index: true
    },
    user: {
      type: String,
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  methods: {},
  statics: {}
}

Usage:

Example:
app.set('models', __dirname +'/models')
app.set('controllers', __dirname +'/controllers')
app.set('routes', __dirname +'/routes.json')
var mvc = require('mvc')(app)
app.models = mvc.loadModels(fs, db)
mvc.loadRoutes(mvc.loadControllers(fs))

db should be a mongoose db connection instance as in mongoose.connect()

To use a model;
app.models.modelFileName.method()