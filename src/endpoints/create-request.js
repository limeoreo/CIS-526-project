
const db = require('../database');
const sanitizeHTML = require('sanitize-html');
const serveError = require('../serve-error');


function createRequest(req, res) {
  const id = parseInt(req.params.id, 10);
  var content = req.body.content;
  var user = req.cookies.currUser;
  var u = db.prepare(`SELECT * FROM users WHERE email=?`).get(user);
  var uid = u.id;
  content = sanitizeHTML(content);
  if(!content) return serveError(req, res, 422, "Empty title or content encountered");
  // Publish the post to the database
  var newRequest = db.prepare("INSERT INTO requests (box_id, request, fulfilled, user_id) VALUES (?, ?, ?, ?)").run(id, content, 0, uid);
 
  // Determine if the write succeeded
  if(newRequest.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
  
  res.statusCode = 302
  res.setHeader('Set-Cookie', "currUser="+user+";");
  res.setHeader("Location", `/box-locations/${id}`)
  res.end();
}

module.exports = createRequest;

