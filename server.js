var express = require('express'), crypto = require('crypto');

function md5(str) { return crypto.createHash('md5').update(str).digest('hex'); }

var app = express.createServer();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.bodyDecoder());
app.use(express.cookieDecoder());
app.use(express.session({ secret: 'braziljs' }));

var palestrantes = [
  {
    id: 1
    , name: "Christiano Milfont"
    , photo: "images/cmilfont.jpg"
    , twitter: "@cmilfont"
    , site: "http://www.milfont.org"
  }
  ,
  {
    id: 1
    , name: "Henrique Soares"
    , photo: "images/gogo.jpg"
    , twitter: "@henriquegogo"
    , site: "http://www.gogs.com.br"
  }
];

app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

app.get('/palestrantes', function(req, res){ 
  res.send(JSON.stringify(palestrantes));
});

app.use(express.errorHandler({ showStack: true }));
app.use(express.staticProvider(__dirname));


app.listen(8000);
console.log('Express started on port 8000');
/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(80, "64.30.137.193");
*/