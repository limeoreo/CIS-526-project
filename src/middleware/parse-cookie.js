const querystring = require('querystring');
const serveError = require('../serve-error');
/** @function parseCookie
 * Parses a cookie and converts it to an associative array
 * @param {string} cookie - the cookie to parse
 * @returns {Object} the assocative array of key/value pairs
 */
function parseCookie(req, res, next) {
  var cookies = {};
  var cookie = req.headers.cookie;
  // Cookies are key/value pairs separated by semicolons,
  // followed by a space, so split the cookie by that string
  cookie.split('; ').forEach(function(pair) {
    // Individual key/value are separated by an equal sign (=)
    pair = pair.split('=');
    var key = pair[0];
    // values are URI encoded, so decode them
    var value = decodeURIComponent(pair[1]);
    // Assign values to keys in the associative array
    cookies[key] = value;
  });
  // Return the parsed cookies
  req.cookies= cookies;
  next();
}

module.exports = parseCookie;