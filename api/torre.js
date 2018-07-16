var request = require("request"),
//    email = require("../../library/sendEmailController"),
    fs = require('fs'),
    path = require('path');
  var Linkedin = require('node-linkedin')('78tjhkxleu8nnm', 'AnpzYTiTX86Ct8rW', 'http://localhost:3000/api/auth/callback');

exports.oauthLinkedin = (req, res) => {
  let scope = ['r_emailaddress', 'r_basicprofile'];
  Linkedin.auth.authorize(res, scope);
}

exports.linkedIn = (req, res, next) => {
  
  let scope = ['r_emailaddress', 'r_basicprofile'];
  let code = req.body.code;
  let state = req.body.state;
  let redirectUri = req.body.redirectUri;
  if(!code){
    return next();
  }
  req.linkedin = {};
  let auth = Linkedin.auth.authorize(null, scope, state, redirectUri );
  
  Linkedin.auth.getAccessToken(res, code, state, function(err, results) {
    if ( err )
        return res.json(err);

    var linkedin = Linkedin.init(results.access_token);
    linkedin.people.me(function(err, $in) {
      req.linkedin = $in;
      req.body.torreId = state;
      return next()
    });
    
});
  
}
exports.bio = (req, res) => {

  let torreId = req.body.torreId;
  console.log(req.linkedin);
  var options = { method: 'GET',
    url: `https://torre.bio/api/bios/${torreId}`,
    headers: { 
      'content-type': 'application/json'
    } 
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  body = (typeof body != 'object')? JSON.parse(body): body;
  body['linkedin'] = req.linkedin;
  res.json(body);
  
});


}

