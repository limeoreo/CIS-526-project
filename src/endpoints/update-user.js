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
function updateUser(req, res) {
  var id = req.body.id;
  var email = req.body.email;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var admin = req.body.admin;
  var role;
  if (admin){
    role = 1;
  }
  else{
    role = 0;
  }
  var currUser = req.cookies.currUser;
  db.prepare(`UPDATE users SET email = ? WHERE id=?`).run(email, id);
  db.prepare(`UPDATE users SET firstname = ? WHERE id=?`).run(firstname, id);
  db.prepare(`UPDATE users SET lastname = ? WHERE id=?`).run(lastname, id);
  db.prepare(`UPDATE users SET role_id = ? WHERE id=?`).run(role, id);
  success(req, res, currUser);
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
  res.setHeader("Location", "/users");
  res.end();
}



module.exports = updateUser;