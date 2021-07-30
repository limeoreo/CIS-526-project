const templates = require('../templates');
const db = require('../database');


function serveHomepage(req, res){
  var lg;
  var roleNum;
  var aL;
  var user = req.cookies.currUser;
  console.log(user);
  if (user){
    lg = templates['logged-in.html']({userName: user});
    roleNum = db.prepare(`SELECT role_id FROM users WHERE email=?`).pluck().get(user);
    if(roleNum === 0){
      aL = "" ;
    } else {
      aL = templates['admin-links.html']();
    }
  }
  else{
    lg = templates['notlogged-in.html']();
    aL = "";
  }
  var layoutHtml = templates['box-cards.html']();
  var html = templates["nav-layout.html"]({
    title: "Manhattan Community Chest",
    adminLinks: aL,
    loginStatus: lg,
    post: layoutHtml,
  });
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveHomepage;