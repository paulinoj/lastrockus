/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();




// SETUP FOR TEST PURPOSES ONLY
const soundcloud = require('./soundcloud2.config.js');
// DATA FOR TEST PURPOSES ONLY

function soundcloudURL(trackID) {
  return `https://api.soundcloud.com/tracks/${trackID}/stream?client_id=${soundcloud.key}`
}

const musicList = 
  [{url: '/song/0',
    title: 'whatever1',
    soundcloudURL: soundcloudURL(25278226)},
   {url: '/song/1',
    title: 'whatever2',
    soundcloudURL: soundcloudURL(251024523)},
   {url: '/song/2',
    title: 'whatever4',
    soundcloudURL: soundcloudURL(30396474)},
   {url: '/song/3',
    title: 'whatever3',
    soundcloudURL: soundcloudURL(77862534)},
   {url: '/song/4',
    title: 'whatever4',
    soundcloudURL: soundcloudURL(204414950)}    
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/music/classical', function response(req, res) {
  res.json(musicList);
  res.end();
});

app.get('/song/:number', function response(req, res) {
  console.log(req.params.number);
  request.get(musicList[req.params.number].soundcloudURL).pipe(res)
});

app.get('/data', function response(req, res) {
  console.log("HELLO");
  res.json({"message": "Data successfully requested"});
});

// Fake signin authentication
app.post('/signin', function response(req, res) {
  if (req.body.password === "hello") {
    res.json({"message": "Here's your token", "token": "SIGNINTOKEN"});
    res.end();    
  }
  else
  {
    res.status(404).send('Not found');
  }

});

app.post('/signup', function response(req, res) {
  if (req.body.password === "hello") {
    res.json({"message": "Here's your token", "token": "SIGNUPTOKEN"});
    res.end();    
  }
  else
  {
    res.status(404).send({"error": "Could not sign you up"});
  }

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
