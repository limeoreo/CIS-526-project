const templates = require('../templates');
const db = require('../database');

function usersTable(req, res){
  var user = req.cookies.currUser;
  var lg = templates['logged-in.html']({userName: user});
  var aL = templates['admin-links.html']();
  res.setHeader('Set-Cookie', "currUser="+user+";");
  var users = db.prepare(`SELECT * FROM users`).all();
  var table = templates['users-table.html']({users});
  var html = templates["nav-layout.html"]({
    title: "Users Table",
    adminLinks: aL,
    loginStatus: lg,
    post: table,
  });
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = usersTable;