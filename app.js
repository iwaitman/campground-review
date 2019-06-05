// Main file - http.server
const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

// Variables
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
// Create an array of objects as a placeholder before building a DB
var campgrounds = [
	{name:"Pacochupuk", image: "https://thedyrt.imgix.net/photo/129926/media/colorado-ridgway-state-park-pa-co-chu-puk-campground_7bf5f64e3497efb71c5c8823e840176b.jpg?auto=format&dpr=2.63&fit=clip&h=150&w=1000&ixlib=ember-1.0.16"},
	{name:"Buckhorn", image: "http://www.coloradowestoutdoors.com/wp-content/uploads/2016/06/BuckHorn42.jpg"},
	{name:"Blue Lakes", image: "https://www.backpacker.com/.image/t_share/MTQ0OTE0MDQ5MzEwNDY3NjQ5/bp0815lake_ordelheide_bluelakes8477_gn_750x400.jpg"},
	{name:"Grand Mesa", image: "https://www.colorado.com/sites/default/files/Mesa_Lakes_GJCVB.jpg"},
	{name:"Weminuche", image: "https://www.mountainphotography.com/images/xl/20070910-Needles-Meadow.jpg"}
];
// Routes
// 1. Landing Page
app.get("/",(req, res)=>res.render('landing'));
// 2. Campgrounds page
app.get("/campgrounds", function(req,res){
	res.render("campgrounds", {campgrounds:campgrounds});
});
// 3. Uploading campgrounds
app.post("/campgrounds", function(req,res){
	// get data from form and add to database
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image};
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect("/campgrounds");
})
// 3.5 Form to upload campground data
app.get("/campgrounds/new",(req,res)=>res.render("new.ejs"));
// Run the Server
app.listen(port, () => console.log(`App listening on port ${port}!`))