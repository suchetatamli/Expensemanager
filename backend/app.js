const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors');
require('dotenv').config();

// This will be our application entry. We'll setup our server here.
const http = require('http');

// Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
    origin: "*",
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-reset-token', 'x-invite-token','x-access-token','_token', 'x-api-key', 'x-www-form-urlencoded'],
    credentials: false
};
app.use(cors(corsOptions));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.use(require('./routes/api'));


const port = parseInt(process.env.PORT, 10) || 5000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

module.exports = app;