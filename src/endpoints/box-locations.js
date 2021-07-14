//gets all box locations
const db = require('../database');
const templates = require('../templates');


function boxLocations(req, res){
  var boxes = db.prepare("SELECT * FROM boxes ORDER BY id ASC").all();
  
  var json = JSON.stringify(boxes);
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