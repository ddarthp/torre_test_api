'use strict';

module.exports = function(app) {
    var cors = require('cors');

 	// api controllers

    let torre = require('./api/torre');
    let linkedin = require('./api/linkedin');

    let originsWhitelist = [
            '*',
            'http://localhost:8080'
    ];
    let corsOptions = {
        origin: function(origin, callback){
            let isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
            callback(null, isWhitelisted);
        },
        credentials:true
    };
    //here is the magic
    app.use(cors(corsOptions));
    app.options('/api', cors(corsOptions));

    app.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    // linkedin 
    app.route('/api/linkedin/authorization')
    .get(linkedin.authorization, cors(corsOptions)); 
    app.route('/api/linkedin/access_token')
    .get(linkedin.accessToken, cors(corsOptions));
    app.route('/api/linkedin/person/me')
    .post(linkedin.person, cors(corsOptions)); 

    // torre bio
    app.route('/api/torre/bio')
        .post(torre.bio, cors(corsOptions)); 



};
