const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { config } = require('./config');

const app = express();

const startServer = () => {
  http.createServer(app).listen(config.server.port, () => {
    console.log(`server is beeing started on port: ${config.server.port}`);
  });
};

startServer();
