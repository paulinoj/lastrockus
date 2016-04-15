/* eslint no-console: 0 */

const path = require('path');
const express = require('express');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();




// SETUP FOR TEST PURPOSES ONLY
const soundcloud = require('./soundcloud2.config.js');
// DATA FOR TEST PURPOSES ONLY
const musicList = 
  [{url: `https://api.soundcloud.com/tracks/25278226/stream?client_id=${soundcloud.key}`,
    answer: 'whatever1'},
   {url: `https://api.soundcloud.com/tracks/251024523/stream?client_id=${soundcloud.key}`,
    answer: 'whatever2'},
   {url: `https://api.soundcloud.com/tracks/77862534/stream?client_id=${soundcloud.key}`,
    answer: 'whatever3'},
   {url: `https://api.soundcloud.com/tracks/30396474/stream?client_id=${soundcloud.key}`,
    answer: 'whatever4'}];

app.get('/music/classical', function response(req, res) {
  res.json(musicList);
  res.end();
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
