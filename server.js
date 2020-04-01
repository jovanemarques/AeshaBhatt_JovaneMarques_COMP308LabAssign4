
function main(){
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    config = require('./config/config');

  const port = config.port;

// Create a new Mongoose connection instance
var db = mongoose();
// Create a new Express application instance
var app = express();
// Use the Express application instance to listen
  app.listen(port, () => {
    console.log('BackEnd Server started on port ' + port);
  });
    // Use the module.exports property to expose our Express application instance for external usage
    module.exports = app; //returns the application object
    // Log the server status to the console
}

main();