const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');
/** @function handleRequest
 * Provides a function for handling HTTP requests 
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function handleRequest(req, res) {
  // TODO: Add response handling
  if(req.method !== 'GET') return res.writeHead(501).end();
  serveFile(req, res);
}
module.exports = handleRequest;