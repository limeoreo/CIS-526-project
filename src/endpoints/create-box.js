const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');

/** @function createUser
 * An endpoint for creating a new user.  The request
 * should have an object as its body parameter with 
 * username, password, and passwordConfirmation set.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function createBox(req, res) {
  // TODO: Create the user
  var name = req.body.boxname;
  var lat = req.body.latitude;
  var long = req.body.longitude;
  var email = req.cookies.currUser;
  var existingBox = db.prepare("SELECT * FROM boxes WHERE name = ?").get(name);
  if(existingBox) return failure(req, res, `The Box "${name}" already exists`);
  var info = db.prepare("INSERT INTO boxes (name, lat, lng) VALUES (?, ?, ?);").run(name, lat, long);
  if(info.changes === 1) success(req, res, email);
  else failure(req, res, "An error occurred.  Please try again.");
}

/** @function success 
 * A helper method invoked when user creation is successful.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {integer} userID - the id of the user in the database
 */
function success(req, res, email) {
  res.statusCode = 302;
  res.setHeader('Set-Cookie', "currUser="+email+";");
  res.setHeader("Location", "/");
  res.end();
}

/** @function failure 
 * A helper method invoked when user creation fails.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - a message to display to the user
 */
function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["new-box.html"]({
    errorMessage: errorMessage
  });
  var msg1 = "" ;
  var aL = "";
  var lg = templates['notlogged-in.html']();
  var html = templates["nav-layout.html"]({
    title: "New Box",
    adminLinks: aL,
    loginStatus: lg,
    post: form,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = createBox;