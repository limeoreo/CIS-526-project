
const templates = require('../templates');

module.exports = function(req, res) {
  var form = templates["signin.html"]({
    errorMessage: ""
  });
  var msg1 = "" ;
  var lg = templates['notlogged-in.html']();
  var html = templates["nav-layout.html"]({
    title: "Sign In",
    loginStatus: lg,
    post: form,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}