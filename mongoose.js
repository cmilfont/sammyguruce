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

var palestrante = new Palestrante({
    name: "Christiano Milfont"
    , photo: "images/cmilfont.jpg"
    , twitter: "@cmilfont"
    , site: "http://www.milfont.org"
  });

palestrante.save(function (err) {
  console.log("Error: " + err);
  mongoose.disconnect();
});