
const bcrypt = require('bcrypt');
const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');

/** @function createSession
 * A helper method invoked when session creation is
 * successful.  The request should have an object
 * as its body parameter with username and password set.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function createSession(req, res) {
  // TODO: Create the session
  var email = req.body.email;
  var password = req.body.password;
  var user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if(!user) return failure(req, res, "Email/Password not found.  Please try again.");
  bcrypt.compare(password, user.cryptedPassword, (err, result) => {
    if(err) return serveError(req, res, 500, err);
    if(result) success(req, res, user);
    else return failure(req, res, "email/Password not found. Please try again.");
  });
}

/** @function success
 * Helper function for creating the user session after 
 * a successful login attempt.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {object} user - the user who signed in
 */
function success(req, res, user) {
  res.statusCode = 302;
  res.setHeader('Set-Cookie', "loginStatus=true;");
  res.setHeader("Location", "/");
  res.end();
}

/** @function failure 
 * A helper function for reporting issues logging a 
 * user in.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - the error message for the user
 */
function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["signin.html"]({
    errorMessage: errorMessage
  });
  var msg1 = "" ;
  var lg = templates['notlogged-in.html']();
  var html = templates["nav-layout.html"]({
    title: "Sign In",
    loginStatus: lg,
    post: form,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = createSession;