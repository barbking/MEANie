// requires
// node modules
var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
// 27017 is default mongo port
mongoose.connect( 'localhost:27017/meanie' );
//schema
var ourSchema = mongoose.Schema({
  name: String,
  location: String
});
//model
var ourModel = mongoose.model( 'ourModels', ourSchema );

//uses
app.use( bodyParser.json() );
app.use( express.static( 'public' ) );

//get index route
app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'public/index.html' ) );
});
//spin up server
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
});

app.get( '/getRecords', function( req, res ){
  console.log ('getRecords', res);
  // get and send back all the things
  ourModel.find().then( function( data ){
  res.send( data );
  });
});

app.post( '/testPost', function( req, res ){
  console.log( 'req.body.name: ' + req.body.name + 'city: ' +req.body.location);
  // retrieved the req.body
  // putting it into an object to be saved in the db
  var recordToAdd={
  name:req.body.name,
  location:req.body.location
  };
  // create new record
  var newRecord=ourModel( recordToAdd );
  newRecord.save();
  console.log(newRecord);
});//end post


app.delete( '/deleteRecords/:id', function( req, res ){
  console.log('req.params to delete->', req.params.id);
  var id = req.params.id;
  ourModel.remove({_id: id}).then(function(){
    res.send(200);
  });
});
