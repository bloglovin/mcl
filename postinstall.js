/**
 * Dependencies
 */
var fs = require('fs')

/**
 * Set up paths and template files
 */
var path = process.cwd() + '/../..'

var directories = [
    'models',
    'controllers',
  ]
  , files = {
    "config.json":
      fs.readFileSync('./templates/config-template.json'),
    "routes.json":
      fs.readFileSync('./templates/routes-template.json'),
    "controllers/index.js": 
      fs.readFileSync('./templates/index-route-template.js'),
    "app.js":
      fs.readFileSync('./templates/app-template.js')
  }

var p
for (var index in directories) {
  p = path +'/'+ directories[index]

  fs.mkdir(p,function(e){
    if(e){
      // hmpf fail
      console.log('Creation of dir'+ p +' failed: '+ e.code)
    } else {
      console.log('Created '+ p)
    }
  });
}

var fn
for (var file in files) {
  fn = path +'/'+ file 
  fs.writeFile(fn, files[file], function(e) {
    if(e){
      // hmpf fail
      console.log('Creation of file'+ fn +' failed: '+ e.code)
    } else {
      console.log('Created '+ fn)
    }
  });
}