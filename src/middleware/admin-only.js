const serveError = require('../serve-error');
const db = require('../database');

/** @function authorsOnly 
 * This middleware prevents access to a route by users without the author role
 * If a user is not signed in, it will redirect them to the sign in route
 * If they are signed in and are not authors, a 403 unautorized error will be served
 * @param {http.IncomingRequest} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 * @param {function} next - a callback to invoke when the request is fulfillable
 */
function adminOnly(req, res, next) {
  var user = req.cookies.currUser;
  if(!user) return res.writeHead(302, {Location: "/signin"}).end();
  var roleNum = db.prepare(`SELECT role_id FROM users WHERE email=?`).pluck().get(user);
  console.log(roleNum);
  if(roleNum !== 0) next();
  else serveError(req, res, 403, `User with role "Visitor" attempted to use an admin-only route`);
}

module.exports = adminOnly;