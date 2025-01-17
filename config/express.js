﻿//express.js file is where we configure our Express application
//
// Load the module dependencies
var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session');
    const cookieParser = require('cookie-parser');
    const cors = require('cors')

    
// Create a new Express application instance
module.exports = function () {
    //Create the Express application object
    var app = express();
    //the process.env property allows you to access predefined environment variables 
    //such as NODE_ENV
    // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    // Use the 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json()); //use middleware that only parses json
    app.use(cookieParser());
    app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
    });
    app.use(cors());
    //
    app.use(methodOverride()); // use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
    //handle the use of PUT or DELETE methods
    //override with POST having ?_method=DELETE or
    // ?_method=PUT
    app.use(methodOverride('_method'));
    //saveUninitialized - orces a session that is "uninitialized" to be saved to the store
    //resave - forces the session to be saved back to the session store
    // Configure the 'session' middleware
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    app.use(express.static('./public'));
    return app;
};
