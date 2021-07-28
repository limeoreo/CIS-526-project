
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
  var user = req.cookies.currUser;
  if (user){
    lg = templates['logged-in.html']({userName: user});
    newrequestHtml = templates['request-form.html']({id:id, userName : user});
    res.setHeader('Set-Cookie', "currUser="+user+";");
  }
  else{
    var msg2 = "Please sign in or sign up to make requests:";
    lg = templates['notlogged-in.html']();
    newrequestHtml = templates['signin-before-request.html']({message:msg2});
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


