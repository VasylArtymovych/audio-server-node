const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { config } = require('./config');
const { trackRouter, albumRouter } = require('./routes');

const app = express();

mongoose.set('strictQuery', false);
mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log('MongoDB connected!!!');
    startServer();
  })
  .catch((error) => console.log(error));

mongoose.connection.on('error', (error) => {
  console.log('Error after connection');
  console.log(error);
});

const startServer = () => {
  app.use(cors({ origin: '*' }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('src/public'));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      return res.status(200).json({});
    }

    next();
  });

  app.use('/tracks', trackRouter);
  app.use('/albums', albumRouter);

  http.createServer(app).listen(config.server.port, () => {
    console.log(`server is beeing started on port: ${config.server.port}`);
  });
};
