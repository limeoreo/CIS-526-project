const db = require('../database');
const sanitizeHTML = require('sanitize-html');
const serveError = require('../serve-error');


function createRequest(req, res) {
  const id = parseInt(req.params.id, 10);
  var content = req.body.content;
  content = sanitizeHTML(content);
    if(!content) return serveError(req, res, 422, "Empty title or content encountered");
  // Publish the post to the database
  var newRequest = db.prepare("INSERT INTO requests (box_id, request, fulfilled) VALUES (?, ?, ?)").run(id, content, 0);
 
  // Determine if the write succeeded
  if(newRequest.changes !== 1) return serveError(req, res, 500, "Unable to write to database");

  res.statusCode = 302
  res.setHeader("Location", `/box-locations/${id}`)
  res.end();
}

module.exports = createRequest;

// done I think??
// Step 1: get request data from form

// Step 2: save the data to the database

// Step 3: 

// res.statusCode = 302
// res.setHeader("Location", `/box-locations/${box.id}`)
// res.end();
// check post after someone sends comment, should be similar