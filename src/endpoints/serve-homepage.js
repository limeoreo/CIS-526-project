const templates = require('../templates');

function serveHomepage(req, res){
  var lg;
  var user = req.cookies.currUser;
  if (user){
    lg = templates['logged-in.html']({userName: user});
    res.setHeader('Set-Cookie', "currUser="+user+";");
  }
  else{
    lg = templates['notlogged-in.html']();
  }
  var layoutHtml = templates['box-cards.html']();
  var html = templates["nav-layout.html"]({
    title: "Manhattan Community Chest",
    loginStatus: lg,
    post: layoutHtml,
  });
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveHomepage;