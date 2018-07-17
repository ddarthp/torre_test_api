var request = require("request"),
fs = require('fs'),
path = require('path'),
Linkedin = require('node-linkedin')('78tjhkxleu8nnm', 'AnpzYTiTX86Ct8rW', 'http://localhost:8080/linkedin/auth');

exports.authorization = (req, res) => {
  let scope = ['r_emailaddress', 'r_basicprofile'];
  let state = req.query.state;
  let redirectUri = req.query.redirect_uri;
  
  Linkedin.auth.authorize(res, scope, state, redirectUri );
  

}

exports.accessToken = (req, res) => {
  let scope = ['r_emailaddress', 'r_basicprofile'];
  let state = req.query.state;
  let redirectUri = req.query.redirect_uri;
  Linkedin.auth.authorize(null, scope, state, redirectUri);
  Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
    if ( err )
        return res.json(err);
    return res.json(results);
  });
}

exports.person = (req, res ) => {
  var linkedin = Linkedin.init(req.body.access_token);
    linkedin.people.me(function(err, $in) {
      return res.json($in)
    });
}
