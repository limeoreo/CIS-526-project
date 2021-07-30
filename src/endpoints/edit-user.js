const templates = require('../templates');
const db = require('../database');

function editUser(req, res){
  var user = req.cookies.currUser;
  const uID = parseInt(req.params.user_id, 10);
  var lg = templates['logged-in.html']({userName: user});
  var aL = templates['admin-links.html']();
  res.setHeader('Set-Cookie', "currUser="+user+";");
  var user = db.prepare(`SELECT * FROM users WHERE id=?`).get(uID);
  var form = templates['edit-user.html']({user});
  var html = templates["nav-layout.html"]({
    title: "Edit User",
    adminLinks: aL,
    loginStatus: lg,
    post: form,
  });
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = editUser;