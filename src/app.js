const express = require('express');
const boxLocations = require('./endpoints/box-locations.js');
const parseBody = require('./middleware/parse-body.js');
const createRequest = require('./endpoints/create-request.js');
const boxlocationDetails = require('./endpoints/box-location-details.js');

const loadSession = require('./middleware/load-session');
const authorsOnly = require('./middleware/authors-only');
const serveError = require('./serve-error');
const basicAuth = require('./middleware/basic-auth');
const newUser = require('./endpoints/new-user');
const newSession = require('./endpoints/new-session');
const createUser = require('./endpoints/create-user');
const createSession = require('./endpoints/create-session');
const destroySession = require('./endpoints/destroy-session');

var app = express();

app.get("/box-locations.json", boxLocations);

app.post("/box-locations/:id/requests", parseBody, createRequest);

app.get("/box-locations/:id", boxlocationDetails);

app.get('/signup', newUser);
app.post("/signup", parseBody, createUser);
app.get('/signin', newSession);
app.post("/signin", parseBody, createSession);
app.get("/signout", destroySession);

app.use(express.static('static'));

module.exports = app;