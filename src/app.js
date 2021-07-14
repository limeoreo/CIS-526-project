const express = require('express');
const boxLocations = require('./endpoints/box-locations.js');
const parseBody = require('./middleware/parse-body.js');
const createRequest = require('./endpoints/create-request.js');
const boxlocationDetails = require('./endpoints/box-location-details.js');

var app = express();

app.get("/box-locations.json", boxLocations);

app.post("/box-locations/:id/requests", parseBody, createRequest);

app.get("/box-locations/:id", boxlocationDetails);

app.use(express.static('static'));

module.exports = app;