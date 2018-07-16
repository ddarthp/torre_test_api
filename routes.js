'use strict';

module.exports = function(app) {
    var cors = require('cors');

 	// api controllers

    let torre = require('./api/torre');

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

    app.route('/api/oauth/linkedin')
        .get(torre.oauthLinkedin, cors(corsOptions))
    
    app.route('/api/torre/bio')
        .post(torre.linkedIn, cors(corsOptions)); 
        // app.route('/api/torre/bio')
        // .post(torre.linkedIn, cors(corsOptions)); 
    app.route('/api/torre/bio')
        .post(torre.bio, cors(corsOptions)); 



};
