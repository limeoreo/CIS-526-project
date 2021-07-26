const bcrypt = require('bcrypt');
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
function createUser(req, res) {
  // TODO: Create the user
  var email = req.body.email;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var passwordConfirmation = req.body.passwordConfirmation;
  if(password !== passwordConfirmation) return failure(req, res, "Your password and password confirmation must match.");
  var existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if(existingUser) return failure(req, res, `The email "${email}" is already associated with an account.`);
  const passes = 10;
  bcrypt.hash(password, passes, (err, hash) => {
    if(err) return serveError(req, res, 500, err);
    // TODO: Save user to the database
    var info = db.prepare("INSERT INTO users (email, firstname, lastname, cryptedPassword) VALUES (?, ?, ?, ?);").run(email, firstname, lastname, hash);
    if(info.changes === 1) success(req, res);
    else failure(req, res, "An error occurred.  Please try again.");
  });
}

/** @function success 
 * A helper method invoked when user creation is successful.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {integer} userID - the id of the user in the database
 */
function success(req, res, userID) {
  res.statusCode = 302;
  res.setHeader('Set-Cookie', "loginStatus=true;");
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
  var form = templates["signup.html"]({
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

module.exports = createUser;