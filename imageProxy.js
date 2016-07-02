var http = require('http');
var url = require('url');
var request = require('request');

const PORT = 8100;

function handleRequest(req, res) {
  var path = req.url;

  if (path == "/alive") {
     res.end("alive");
     return;
  }


  var reg = /\w*\.(jpg|gif|png)/i
  var matches = reg.exec(path);
  if (matches == null) {
    res.end("invalid filename");
  } else {
    var filename = matches[0];
    var uri = "http://image.mammababy.lifenstats.com.s3-website-us-west-2.amazonaws.com/"+filename;
    
    res.setHeader("Content-Type", "image/png");
    request.get(uri).pipe(res);
  }
}


var server = http.createServer(handleRequest);

server.listen(PORT, function() {
  console.log("server running...");
});
