const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

//Connects to mongodb. If no db with that name exists it will make one.
mongoose.connect('mongodb://localhost/bike_market');

// create a variable that points to the path where all of the models live
var models_path = path.join(__dirname, './../models');
// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
  }
});
