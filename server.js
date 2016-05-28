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

const models = require('./server/sequelize/models');
models.sequelize.sync();
// DB Setup

// DATA FOR TEST PURPOSES ONLY
const musicList = 
  [{genre: 'classical',
    title: 'whatever1',
    soundcloudTrack: "25278226"},
   {genre: 'classical',
    title: 'whatever2',
    soundcloudTrack: "251024523"},
   {genre: 'classical',
    title: 'whatever3',
    soundcloudTrack: "73102421"},
   {genre: 'classical',
    title: 'whatever4',
    soundcloudTrack: "77862534"},
   {genre: 'classical',
    title: 'whatever5',
    soundcloudTrack: "39147564"}    
  ];

const musicList2 = 
  [{genre: 'classical',
    title: 'whatever6',
    soundcloudTrack: "25278226"},
   {genre: 'classical',
    title: 'whatever7',
    soundcloudTrack: "251024523"},
   {genre: 'classical',
    title: 'whatever8',
    soundcloudTrack: "73102421"},
   {genre: 'classical',
    title: 'whatever9',
    soundcloudTrack: "77862534"},
   {genre: 'classical',
    title: 'whatever10',
    soundcloudTrack: "39147564"}    
  ];

const musicList3 = 
  [{genre: 'eighties',
    title: 'whatever11',
    soundcloudTrack: "25278226"},
   {genre: 'eighties',
    title: 'whatever12',
    soundcloudTrack: "251024523"},
   {genre: 'eighties',
    title: 'whatever13',
    soundcloudTrack: "73102421"},
   {genre: 'eighties',
    title: 'whatever14',
    soundcloudTrack: "77862534"},
   {genre: 'eighties',
    title: 'whatever15',
    soundcloudTrack: "39147564"}    
  ];

const musicList4 = 
  [{genre: 'eighties',
    title: 'whatever16',
    soundcloudTrack: "25278226"},
   {genre: 'eighties',
    title: 'whatever17',
    soundcloudTrack: "251024523"},
   {genre: 'eighties',
    title: 'whatever18',
    soundcloudTrack: "73102421"},
   {genre: 'eighties',
    title: 'whatever19',
    soundcloudTrack: "77862534"},
   {genre: 'eighties',
    title: 'whatever20',
    soundcloudTrack: "39147564"}    
  ];

// const musicList2 = 
//   [{genre: 'eighties',
//     title: 'Saturday Night',
//     soundcloudTrack: "73102421"},
//    {genre: 'eighties',
//     title: 'Saturday Night',
//     soundcloudTrack: "73102421"},
//    {genre: 'eighties',
//     title: 'Saturday Night',
//     soundcloudTrack: "73102421"},
//    {genre: 'eighties',
//     title: 'Saturday Night',
//     soundcloudTrack: "73102421"},
//    {genre: 'eighties',
//     title: 'I Just Wanna Stop',
//     soundcloudTrack: "114113508"}    
//   ];

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Call router with our app
router(app);

// CREATE TEMPORARY ROUTES FOR ADDING TO DATABASE

app.post('/makeSongList', function(req, res) {
  models.SongList.create({
    genre: "classical"
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
    genre: "classical"
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


app.post('/makeSongList3', function(req, res) {
  models.SongList.create({
    genre: "eighties"
  }).then(function(songList) {

    function songLoop(counter) {
      var title;
      if (counter > 0) {
        title = "whatever" + counter;
        counter--;
        models.Song.create({
          genre: musicList3[counter].genre,
          title: musicList3[counter].title,
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
    songLoop(musicList3.length);
  });
});


app.post('/makeSongList4', function(req, res) {
  models.SongList.create({
    genre: "eighties"
  }).then(function(songList) {

    function songLoop(counter) {
      var title;
      if (counter > 0) {
        title = "whatever" + counter;
        counter--;
        models.Song.create({
          genre: musicList4[counter].genre,
          title: musicList4[counter].title,
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
    songLoop(musicList4.length);
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
