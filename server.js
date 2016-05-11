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

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:auth/auth';
mongoose.connect(mongoURI);

// DATA FOR TEST PURPOSES ONLY
const musicList = 
  [{genre: 'pop',
    title: 'whatever1',
    soundcloudTrack: "25278226"},
   {genre: 'pop',
    title: 'whatever2',
    soundcloudTrack: "251024523"},
   {genre: 'pop',
    title: 'whatever3',
    soundcloudTrack: "30396474"},
   {genre: 'pop',
    title: 'whatever4',
    soundcloudTrack: "77862534"},
   {genre: 'pop',
    title: 'whatever5',
    soundcloudTrack: "39147564"}    
  ];

const musicList2 = 
  [{genre: 'eighties',
    title: 'Saturday Night',
    soundcloudTrack: "73102421"},
   {genre: 'eighties',
    title: 'Saturday Night',
    soundcloudTrack: "73102421"},
   {genre: 'eighties',
    title: 'Saturday Night',
    soundcloudTrack: "73102421"},
   {genre: 'eighties',
    title: 'Saturday Night',
    soundcloudTrack: "73102421"},
   {genre: 'eighties',
    title: 'I Just Wanna Stop',
    soundcloudTrack: "114113508"}    
  ];

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Call router with our app
router(app);

// CREATE TEMPORARY ROUTES FOR ADDING TO DATABASE
const models = require('./server/sequelize/models');

app.post('/makeSongList', function(req, res) {
  models.SongList.create({
    genre: "pop"
  }).then(function(songList) {

    function songLoop(counter) {
      var title;
      if (counter > 0) {
        title = "whatever" + counter;
        counter--;
        models.Song.create({
          genre: musicList[counter].genre,
          title: musicList[counter].title,
          soundcloudTrack: musicList[counter].soundcloudTrack
        }).then(function(song) {
          songList.addSong(song);
          if (counter === 0) {
            res.json(songList);
          }
          else
          {
            songLoop(counter);
          }
        });
      }      
    }
    songLoop(musicList.length);
  });
});

app.post('/makeSongList2', function(req, res) {
  models.SongList.create({
    genre: "eighties"
  }).then(function(songList) {

    function songLoop(counter) {
      var title;
      if (counter > 0) {
        title = "whatever" + counter;
        counter--;
        models.Song.create({
          genre: musicList2[counter].genre,
          title: musicList2[counter].title,
          soundcloudTrack: musicList2[counter].soundcloudTrack
        }).then(function(song) {
          songList.addSong(song);
          if (counter === 0) {
            res.json(songList);
          }
          else
          {
            songLoop(counter);
          }
        });
      }      
    }
    songLoop(musicList2.length);
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
