const express = require('express');
const boxLocations = require('./endpoints/box-locations.js');
const parseBody = require('./middleware/parse-body.js');
const createRequest = require('./endpoints/create-request.js');
const boxlocationDetails = require('./endpoints/box-location-details.js');
const serveHomepage = require('./endpoints/serve-homepage.js');
const fulfillRequest = require('./endpoints/fulfill-request.js');
const loadSession = require('./middleware/load-session');
const adminOnly = require('./middleware/admin-only');
const serveError = require('./serve-error');
const basicAuth = require('./middleware/basic-auth');
const newUser = require('./endpoints/new-user');
const newSession = require('./endpoints/new-session');
const createUser = require('./endpoints/create-user');
const createSession = require('./endpoints/create-session');
const destroySession = require('./endpoints/destroy-session');
const parseCookie = require('./middleware/parse-cookie');
const newBox = require('./endpoints/new-box');
const createBox = require('./endpoints/create-box');
const usersTable = require('./endpoints/users-table');
const editUser = require('./endpoints/edit-user');
const updateUser = require('./endpoints/update-user');

var app = express();

app.use(parseCookie);

app.get("/", serveHomepage);

app.get("/box-locations.json", boxLocations);

app.post("/box-locations/:id/requests", parseBody, createRequest);

app.get("/box-locations/create", adminOnly, newBox);
app.post("/box-locations/create", adminOnly, parseBody, createBox);

app.get("/users", adminOnly, usersTable);
app.get("/users/:user_id", adminOnly, editUser);
app.post("/users/:user_id", adminOnly, parseBody, updateUser);

app.get("/box-locations/:id", boxlocationDetails);
app.get("/box-locations/:box_id/requests/:requests_id/fulfill", fulfillRequest);

app.get('/signup', newUser);
app.post("/signup", parseBody, createUser);

app.get('/signin', newSession);
app.post("/signin", parseBody, createSession);

app.get("/signout", destroySession);

app.use(express.static('static'));

module.exports = app;