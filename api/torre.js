var request = require("request"),
  fs = require('fs'),
  path = require('path');

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

