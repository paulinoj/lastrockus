/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup

mongoose.connect('mongodb://localhost:auth/auth')

// DATA FOR TEST PURPOSES ONLY
// const musicList = 
//   [{url: '/song/0',
//     title: 'whatever1',
//     soundcloudURL: soundcloudURL(25278226)},
//    {url: '/song/1',
//     title: 'whatever2',
//     soundcloudURL: soundcloudURL(251024523)},
//    {url: '/song/2',
//     title: 'whatever4',
//     soundcloudURL: soundcloudURL(30396474)},
//    {url: '/song/3',
//     title: 'whatever3',
//     soundcloudURL: soundcloudURL(77862534)},
//    {url: '/song/4',
//     title: 'whatever4',
//     soundcloudURL: soundcloudURL(204414950)}    
// ];

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Call router with our app
router(app);

// CREATE TEMPORARY ROUTES FOR ADDING TO DATABASE
const models = require('./server/sequelize/models');
app.post('/makeSong', function(req, res) {
  models.Song.create({
    genre: req.body.genre,
    title: req.body.title,
    soundcloudTrack: req.body.soundcloudTrack,
    SongListID: req.body.SongListID
  }).then(function(song) {
    res.json(song);
  });
});
app.post('/makeSongList', function(req, res) {
  models.SongList.create({
    genre: req.body.genre
  }).then(function(songList) {
    res.json(songList);
  });
});
// **** END OF TEMPORARY ROUTES FOR ADDING TO DATABASE

app.get('/data', function response(req, res) {
  res.json({"message": "Data successfully requested"});
});


if (isDeveloping) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
