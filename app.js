// Package Setup
const express = require('express'),
	  app = express(),
	  request = require('request'),
	  bodyParser = require('body-parser'),
	  MongoClient = require('mongodb').MongoClient,
	  assert = require('assert'),
	  mongoose = require('mongoose');

// Connections
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
const mongo_url = 'mongodb://localhost:27017';
const dbName = 'myproject';
mongoose.connect(mongo_url);
mongoose.set('useNewUrlParser', true);

// Mongoose setup
const campgroundSchema = new mongoose.Schema({
	name: String,
	description: String,
	image: String
});

const campgrounds = mongoose.model("campgrounds", campgroundSchema);


// Create an array of objects as a placeholder before building a DB
// var campgrounds = [
// 	{name:"Pacochupuk", image: "https://thedyrt.imgix.net/photo/129926/media/colorado-ridgway-state-park-pa-co-chu-puk-campground_7bf5f64e3497efb71c5c8823e840176b.jpg?auto=format&dpr=2.63&fit=clip&h=150&w=1000&ixlib=ember-1.0.16"},
// 	{name:"Buckhorn", image: "http://www.coloradowestoutdoors.com/wp-content/uploads/2016/06/BuckHorn42.jpg"},
// 	{name:"Blue Lakes", image: "https://www.backpacker.com/.image/t_share/MTQ0OTE0MDQ5MzEwNDY3NjQ5/bp0815lake_ordelheide_bluelakes8477_gn_750x400.jpg"},
// 	{name:"Grand Mesa", image: "https://www.colorado.com/sites/default/files/Mesa_Lakes_GJCVB.jpg"},
// 	{name:"Weminuche", image: "https://www.mountainphotography.com/images/xl/20070910-Needles-Meadow.jpg"}
// ];

// Routes
// 1. Landing Page
app.get("/",(req, res)=>res.render('landing'));
// 2. Campgrounds page
app.get("/campgrounds", function(req,res){
	campgrounds.find({}, function(err,campgroundData){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds", {campgrounds:campgroundData});
		};
	});
});
// 3. Uploading campgrounds
app.post("/campgrounds", function(req,res){
	// get data from form and add to database
	var name = req.body.name;
	var image = req.body.image;
	campgrounds.create(
		{
			name: name, 
			image: image

		}, function(err, campground){
			if(err){
				console.log(err);
			} else{ 
				console.log("Added to DB: "+ campground);
			};
		})
	// redirect back to campgrounds page
	res.redirect("/campgrounds");
})
// 3.5 Form to upload campground data
app.get("/campgrounds/new",(req,res)=>res.render("new.ejs"));
// Run the Server
app.listen(port, () => console.log(`App listening on port ${port}!`))

// // Create a new MongoClient
// const client = new MongoClient(mongo_url);

// // Use connect method to connect to the Server
// client.connect(function(err) {	
//  	assert.equal(null, err);
//  	console.log("Connected successfully to server");

//  	const db = client.db(dbName);

//  	insertDocuments(db, function() {
//  		findDocuments(db, function() {
//       		client.close();
//     	});
//  	});
// });

// // Practice inserting documents
// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }

// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('documents');
//   // Find some documents
//   collection.find({}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs)
//     callback(docs);
//   });
// }
