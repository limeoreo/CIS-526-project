const templates = require('../templates');
const db = require('../database');

function fulfillRequest(req, res){
  const id = parseInt(req.params.box_id, 10);
  const rID = parseInt(req.params.requests_id, 10);
  var lg;
  var fulfillrequestHtml;
  
  var user = req.cookies.currUser;
  if (user){
    // update request to be fulfilled
    lg = templates['logged-in.html']({userName: user});
    //update db
    db.prepare(`UPDATE requests SET fulfilled=1 WHERE id=?`).run(rID);
    res.statusCode = 302
    res.setHeader('Set-Cookie', "currUser="+user+";");
    res.setHeader("Location", `/box-locations/${id}`)
    res.end();
  }
  else{
    //return sign in page
    var aL = "";
    var msg = "Please sign in or sign up to mark requests as fulfilled:";
    lg = templates['notlogged-in.html']();
    fulfillrequestHtml = templates['signin-before-request.html']({message:msg});
    var html = templates["nav-layout.html"]({
      title: msg,
      adminLinks: aL,
      loginStatus: lg,
      post: fulfillrequestHtml,
    });

    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);
    }
  
}

module.exports = fulfillRequest;