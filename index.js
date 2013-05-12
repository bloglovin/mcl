module.exports = function (app) {
  return {
    
    /*
     * loadModels
     * Load and compile models dynamically from folder models
     * Depends on:
     *    mongoose
     *    fs
     * @param fs instance of fs
     * @param db instance of mongoose connection
     * @return obj compiled mongoose models
     */
    loadModels: function(fs, db) {
      // Models
      var models = {}
      fs.readdirSync(app.get('models')).forEach(function (file) {
        if (file[0] == '.') { // protects agains hidden files
          return
        }

        var name = file
          .slice(0, -3)
          .charAt(0)
          .toUpperCase()
          + file
            .slice(0, -3)
            .slice(1)

        var model = require(app.get('models') +'/'+ file)
          , schema = new db.Schema(model.schema)

        for (var key in model.statics) {
          schema.statics[key] = model.statics[key]
        }

        for (var key in model.methods) {
          schema.methods[key] = model.methods[key]
        }

        // Compile model schema
        models[name.toLowerCase()] = db.model(name, schema)
      })

      return models
    },

    /*
     * loadControllers
     * Fetch our controllers from the controller folder
     */
    loadControllers: function(fs) {
      var controllers = {}
      
      fs.readdirSync(app.get('controllers')).forEach(function (file) {
        controllers[file.slice(0, -3)] = require(app.get('controllers') +'/'+ file)(app)
      })

      return controllers
    },

    /*
     * loadRoutes
     * Parse routes and match with controllers
     */
    loadRoutes: function(controllers) {
      var routes = require(app.get('routes'))
      
      for (var route in routes) {
        for (var method in routes[route]) {
          var m = routes[route][method].split('.')
          var req_method = controllers

          for (var part in m) {
            req_method = req_method[m[part]]
          }
        
          app[method](route, req_method)
        }
      }
    }
  }
}