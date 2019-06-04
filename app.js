const express = require('express');
const app = express();
const request = require('request');
const port = 3000;

// Variables

// Routes
// 1. Landing Page
app.set("view engine", "ejs");
app.get("/",(req, res)=>res.render('landing'));
// 2. Campgrounds page
app.get("/campgrounds", function(req,res){
	// Create an array of objects as a placeholder before building a DB
	let campgrounds = [
		{name:"Pacochupuk", image: "https://thedyrt.imgix.net/photo/129926/media/colorado-ridgway-state-park-pa-co-chu-puk-campground_7bf5f64e3497efb71c5c8823e840176b.jpg?auto=format&dpr=2.63&fit=clip&h=150&w=1000&ixlib=ember-1.0.16"},
		{name:"Buckhorn", image: "http://www.coloradowestoutdoors.com/wp-content/uploads/2016/06/BuckHorn42.jpg"},
		{name:"Blue Lakes", image: "https://www.backpacker.com/.image/t_share/MTQ0OTE0MDQ5MzEwNDY3NjQ5/bp0815lake_ordelheide_bluelakes8477_gn_750x400.jpg"},
		{name:"Grand Mesa", image: "https://www.colorado.com/sites/default/files/Mesa_Lakes_GJCVB.jpg"},
		{name:"Weminuche", image: "https://www.mountainphotography.com/images/xl/20070910-Needles-Meadow.jpg"}
	];
	res.render("campgrounds", {campgrounds:campgrounds});
})
// Run the Server
app.listen(port, () => console.log(`App listening on port ${port}!`))