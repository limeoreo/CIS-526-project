
//gets all box locations
const db = require('../database');
const templates = require('../templates');


function boxLocations(req, res){
  var boxes = db.prepare("SELECT * FROM boxes ORDER BY id ASC").all();
  
  var json = JSON.stringify(boxes);
  //var lg = templates['logged-in.html']({username: req.session.username});
  //if (req.session == NULL){
  //  var msg1 = "" ;
  //  lg = templates['notlogged-in.html'](message:msg1);
  //}
  //var html = templates["nav-layout.html"]({
  //  title: "Sign Up",
  //  loginStatus: lg,
  //  post: json,
  //});
  res.setHeader('Set-Cookie', "loginStatus=true;");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Length", json.length);
  res.end(json);
  
}

module.exports = boxLocations;

// TO-DO get all boxes from the database

// turn that array into JSON string

// ***corresponds to box-locations.json, delete that file 

// Serve JSON string as body

// content type for JSON is "application/json"