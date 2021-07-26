const http = require('http');
const app = require('./src/app');
require('./src/database');
require('./src/templates');

const port = 3000;

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

