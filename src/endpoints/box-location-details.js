
//gets one specific box data
const templates = require('../templates');
const db = require('../database');


function boxlocationDetails(req, res){
  const id = parseInt(req.params.id, 10);
  const url = "https://open.mapquestapi.com/staticmap/v4/getmap?key=xUKTW6hFYMieaxS4W19rh5JAVaZQ8xNU&size=600,400&zoom=13&pois=purple,";
  var box = db.prepare(`SELECT * FROM boxes WHERE id = ?;`).get(id);
  var requests = db.prepare(`SELECT * FROM requests WHERE box_id = ?;`).all(id);
  var boxImg = url + box.lat + "," + box.lng + ",-20,-20";
  var loc = box.name;
  var lg;
  var newrequestHtml;
  if (!parseCookie(req.headers.cookie)[0]){
    var msg2 = "Please sign in or sign up to make requests:";
    lg = templates['notlogged-in.html']();
    newrequestHtml = templates['signin-before-request.html']({message:msg2});
  }
  else{
    lg = templates['logged-in.html']({firstname: req.params.firstname});
    newrequestHtml = templates['request-form.html']({id});
    res.setHeader('Set-Cookie', "loginStatus=true;");
  }
  var detailsHtml = templates['box-details.html']({boxlocation: loc, boximg: boxImg});
  var requestsHtml = templates['posted-requests.html']({requests});
  var layoutHtml = templates['onebox-layout.html']({boxlocation: loc, boxdetails:detailsHtml, requestlist:requestsHtml, requestform:newrequestHtml});
  var html = templates["nav-layout.html"]({
    title: "Box Details",
    loginStatus: lg,
    post: layoutHtml,
  });
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = boxlocationDetails;

/** @function parseCookie
 * Parses a cookie and converts it to an associative array
 * @param {string} cookie - the cookie to parse
 * @returns {Object} the assocative array of key/value pairs
 */
function parseCookie(cookie) {
  var cookies = {};
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
  return cookies;
}
