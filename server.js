var express = require('express'), crypto = require('crypto');

var mongoose = require('mongoose'); 
mongoose.connect('mongodb://universitas:universitas@flame.mongohq.com:27086/universitas');
console.log(mongoose.connection.host); 
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var Palestrante = new Schema({
   _id         : ObjectId
  , name       : String
  , photo      : String
  , twitter    : String
  , site       : String
  , created_at : { type: Date, "default": Date.now }
});
mongoose.model('Palestrante', Palestrante);
var Palestrante = mongoose.model('Palestrante');

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
    id: 2
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

app.get('/palestrantes/:id', function(req, res){
  var speaker = {};
  palestrantes.forEach(function(palestrante){
    if(palestrante.id == req.params["id"]) speaker = palestrante;
  });
  res.send(JSON.stringify(speaker));
});

app.post('/palestrantes', function(req, res){
  var json = JSON.parse(req.body["json"]);
  console.log(json);
  var palestrante = new Palestrante(json);
  palestrante.save(function (err) {
    if(err) console.log("Error: " + err);
  });
  console.log(palestrante);
  res.send(JSON.stringify(palestrante));
});

app.put('/palestrantes/:id', function(req, res){
  console.log(req.params);
  console.log(req.body);
  res.send(JSON.stringify(palestrantes));
});

app.delete('/palestrantes/:id', function(req, res){
  console.log(req.params);
  console.log(req.body);
  res.send(JSON.stringify(palestrantes));
});

app.use(express.errorHandler({ showStack: true }));
app.use(express.staticProvider(__dirname));


//app.listen(8000);
app.listen(80, "64.30.137.193");

/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(80, "64.30.137.193");
*/