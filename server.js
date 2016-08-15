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

const musicList1 = 
  [{genre: 'seventies',
    title: 'Staying Alive',
    artist: 'Bee Gees',
    soundcloudTrack: "80343947",
    volume: 0.65,
    permalink_url: "https://soundcloud.com/stilfreee/bee-gees-staying-alive",
    soundcloudUser: "Deako"},
   {genre: 'seventies',
    title: "Don't Fear The Reaper",
    artist: 'Blue Oyster Cult',
    soundcloudTrack: "243343427",
    volume: 0.85,
    permalink_url: "https://soundcloud.com/stringwagon/dont-fear-the-reaper-blue-oyster-cult",
    soundcloudUser: "Manuel Martinez"},
   {genre: 'seventies',
    title: "Makin' It",
    artist: 'David Naughton',
    soundcloudTrack: "37989778",
    volume: 1.0,
    permalink_url: "https://soundcloud.com/thomas-fawcett-majors/david-naughton-makin-it?in=keith-longoria/sets/david-naughton-makin-it",
    soundcloudUser: "Thomas Rivette"},
   {genre: 'seventies',
    title: "Dreams",
    artist: 'Fleetwood Mac',
    soundcloudTrack: "75962524",
    volume: 1.0,
    permalink_url: "https://soundcloud.com/akai-edits/stevie-nicks-dreams-of-akais?in=shelly-winters/sets/dreams-stevie-nicks",
    soundcloudUser: "Akai Edits"},
   {genre: 'seventies',
    title: "I Will Survive",
    artist: 'Gloria Gaynor',
    soundcloudTrack: "35951800",
    volume: 0.80,
    permalink_url: "https://soundcloud.com/banoo-002/gloria-gaynor-i-will-survive",
    soundcloudUser: "Mano Beshno 002"}
  ];

const musicList2 = 
  [{genre: 'seventies',
    title: "More Than A Feeling",
    artist: 'Boston',
    soundcloudTrack: "210867179",
    volume: 0.6,
    permalink_url: "https://soundcloud.com/gembong-martin/boston-more-than-a-feeling",
    soundcloudUser: "Gembong Martin"},
   {genre: 'seventies',
    title: "My Sharona",
    artist: 'The Knack',
    soundcloudTrack: "41279402",
    volume: 0.6,
    permalink_url: "https://soundcloud.com/steve-ouimette/my-sharona",
    soundcloudUser: "Steve Ouimette"},
   {genre: 'seventies',
    title: "Dancing Queen",
    artist: 'Abba',
    soundcloudTrack: "187768173",
    volume: 0.5,
    permalink_url: "https://soundcloud.com/abba-99/dancing-queen",
    soundcloudUser: "ABBA 99"},
   {genre: 'seventies',
    title: "Hustle",
    artist: 'Van McCoy',
    soundcloudTrack: "206312378",
    volume: 1.0,
    permalink_url: "https://soundcloud.com/chap-disco/the-hustle-van-mccoy-rework",
    soundcloudUser: "Chap-Disco"},
   {genre: 'seventies',
    title: "Ring My Bell",
    artist: 'Anita Ward',
    soundcloudTrack: "84882471",
    volume: 0.45,
    permalink_url: "https://soundcloud.com/radiowebdaion-1/anita-ward-ring-my-bell",
    soundcloudUser: "Radiowebdaion"},
  ];

const musicList3 = 
  [{genre: 'eighties',
    title: 'Material Girl',
    artist: 'Madonna',
    soundcloudTrack: "144171420",
    volume: 0.6,
    permalink_url: "https://soundcloud.com/mfordummies/13-material-girl",
    soundcloudUser: "MforDummies"},
   {genre: 'eighties',
    title: "Billie Jean",
    artist: 'Michael Jackson',
    soundcloudTrack: "9303725",
    volume: 1.0,
    permalink_url: "https://soundcloud.com/reynaertjelle/jelle-billie-jean-micheal-jackson",
    soundcloudUser: "reynaertjelle"},
   {genre: 'eighties',
    title: "I Can't Go For That",
    artist: 'Hall & Oates',
    soundcloudTrack: "26717295",
    volume: 0.7,
    permalink_url: "https://soundcloud.com/opuseighty/hall-and-oates-i-cant-go-for",
    soundcloudUser: "Opus Eighty"},
   {genre: 'eighties',
    title: "Everybody Wants To Rule The World",
    artist: 'Tears For Fears',
    soundcloudTrack: "15464864",
    volume: 0.5,
    permalink_url: "https://soundcloud.com/aramisschultz/tears-for-fears-everybody",
    soundcloudUser: "aramis-schultz"},
   {genre: 'eighties',
    title: "Africa",
    artist: 'Toto',
    soundcloudTrack: "151129490",
    volume: 0.4,
    permalink_url: "https://soundcloud.com/clemenswenners/africa",
    soundcloudUser: "Clemens Wenners"}
  ];

const musicList4 = 
  [{genre: 'eighties',
    title: "Jessie's Girl",
    artist: 'Rick Springfield',
    soundcloudTrack: "171114064",
    volume: 0.7,
    permalink_url: "https://soundcloud.com/heberguevara/jessies-girl-rick-springfield",
    soundcloudUser: "Heber Guevara"},
   {genre: 'eighties',
    title: "Holiday",
    artist: 'Madonna',
    soundcloudTrack: "162076780",
    volume: 0.6,
    permalink_url: "https://soundcloud.com/paris-13/madonna-holiday-2014-edit",
    soundcloudUser: "loveblonde2013"},     
   {genre: 'eighties',
    title: "The Power of Love",
    artist: 'Huey Lewis',
    soundcloudTrack: "36162495",
    volume: 0.95,
    permalink_url: "https://soundcloud.com/rub-n-carri-n/the-power-of-love-huey-lewis",
    soundcloudUser: "Rubén Carrión"},
   {genre: 'eighties',
    title: "Maniac",
    artist: 'Michael Sembello',
    soundcloudTrack: "48574581",
    volume: 1.0,
    permalink_url: "https://soundcloud.com/naoufeldastan/maniac-michael-sembello",
    soundcloudUser: "NaoufelDastan"},
   {genre: 'eighties',
    title: "Come On Eileen",
    artist: "Dexys Midnight Runners",
    soundcloudTrack: "62542293",
    volume: 0.75,
    permalink_url: "https://soundcloud.com/theliongoasroar/dexys-midnight-runners-come-on",
    soundcloudUser: "theliongoesroar"}
  ];


const musicList5 = 
   [{genre: 'pop',
    title: 'Uptown Funk',
    artist: 'Bruno Mars',
    soundcloudTrack: "184023649",
    volume: 0.75,
    permalink_url: "https://soundcloud.com/nslhnciftci/uptown-funk-mark-ronson-ft-bruno-mars-max-schneider-mike-tompkins-cover",
    soundcloudUser: "nslhnciftci"},
   {genre: 'pop',
    title: "Sugar",
    artist: 'Maroon 5',
    soundcloudTrack: "200865665",
    volume: 1.0,
    permalink_url: "https://soundcloud.com/dpb-lootb/maroon-5-sugar-lyrics",
    soundcloudUser: "Dpb Lootb"},
   {genre: 'pop',
    title: "Hold My Hand",
    artist: 'Jess Glynne',
    soundcloudTrack: "209001340",
    volume: 0.7,
    permalink_url: "https://soundcloud.com/tonymathe/jess-glynne-hold-my-hand-tony-mathe-extended",
    soundcloudUser: "tonymathe"},
   {genre: 'pop',
    title: "Rolling In The Deep",
    artist: 'Adele',
    soundcloudTrack: "90577641",
    volume: 0.7,
    permalink_url: "https://soundcloud.com/florencia-cot/adelle-rolling-in-the-deep",
    soundcloudUser: "Florencia Cot"},
   {genre: 'pop',
    title: "Shake It Off",
    artist: 'Taylor Swift',
    soundcloudTrack: "178227873",
    volume: 0.8,
    permalink_url: "https://soundcloud.com/samwxlfe/shake-it-off-the-dj-mike-d-1",
    soundcloudUser: "Sam Wolfe"}
  ];

const musicList6 = 
  [{genre: 'classical',
    title: "Claire De Lune",
    artist: 'Claude Debussy',
    soundcloudTrack: "101845031",
    volume: 0.5,
    permalink_url: "https://soundcloud.com/classical-piano-hits/claire-de-lune",
    soundcloudUser: "Classical Piano Hits"},
   {genre: 'classical',
    title: "Brandenburg Concerto No. 5",
    artist: 'Johann Sebastian Bach',
    soundcloudTrack: "193426469",
    volume: 0.85,
    permalink_url: "https://soundcloud.com/chicagosymphony/brandenburg-concerto-no-5-i",
    soundcloudUser: "ChicagoSymphony"},
   {genre: 'classical',
    title: "Turkish March",
    artist: 'Wolfgang Amadeus Mozart',
    soundcloudTrack: "128141776",
    volume: 0.75,
    permalink_url: "https://soundcloud.com/nadaossama/turkish-march-mozart",
    soundcloudUser: "Nada Ossama"},
   {genre: 'classical',
    title: "Flight of the Bumblebee",
    artist: 'Nikolai Rimsky-Korsakov',
    soundcloudTrack: "116056283",
    volume: 1.0,
    permalink_url: "https://soundcloud.com/robin-scheidegger/nikolai-rimsky-korsakov-flight",
    soundcloudUser: "Robin"},
   {genre: 'classical',
    title: "The Four Seasons",
    artist: 'Antonio Vivaldi',
    soundcloudTrack: "123996708",
    volume: 0.6,
    permalink_url: "https://soundcloud.com/veillex01/vivaldi-four-seasons",
    soundcloudUser: "Veillex01"}
  ];


// const musicList3 = 
//   [{genre: 'classical',
//     title: "Prélude à l'après-midi d'un faune",
//     artist: 'Claude Debussy',
//     soundcloudTrack: "67304716",
//     volume: 0.5,
//     permalink_url: "https://soundcloud.com/necmusic/debussy-pr-lude-lapr-s-midi",
//     soundcloudUser: "necmusic"},
//    {genre: 'classical',
//     artist: 'Bedrich Smetana',
//     title: "The Moldau",
//     soundcloudTrack: "77862534",
//     volume: 0.5,
//     permalink_url: "https://soundcloud.com/ludovico-trianni/smetana-the-moldau",
//     soundcloudUser: "ludovico trianni"},
//   ];


app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Call router with our app
router(app);

// CREATE TEMPORARY ROUTES FOR ADDING TO DATABASE

app.post('/makeSongList1', function(req, res) {
  models.SongList.create({
    genre: "seventies"
  }).then(function(songList) {

    function songLoop(counter) {
      var title;
      if (counter > 0) {
        title = "whatever" + counter;
        counter--;
        models.Song.create({
          genre: musicList1[counter].genre,
          title: musicList1[counter].title,
          artist: musicList1[counter].artist,          
          soundcloudTrack: musicList1[counter].soundcloudTrack,
          permalink_url: musicList1[counter].permalink_url,
          volume: musicList1[counter].volume,
          soundcloudUser: musicList1[counter].soundcloudUser
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
    songLoop(musicList1.length);
  });
});

app.post('/makeSongList2', function(req, res) {
  models.SongList.create({
    genre: "seventies"
  }).then(function(songList) {

    function songLoop(counter) {
      var title;
      if (counter > 0) {
        title = "whatever" + counter;
        counter--;
        models.Song.create({
          genre: musicList2[counter].genre,
          title: musicList2[counter].title,
          artist: musicList2[counter].artist,          
          soundcloudTrack: musicList2[counter].soundcloudTrack,
          permalink_url: musicList2[counter].permalink_url,
          volume: musicList2[counter].volume,
          soundcloudUser: musicList2[counter].soundcloudUser
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
          artist: musicList3[counter].artist,          
          soundcloudTrack: musicList3[counter].soundcloudTrack,
          permalink_url: musicList3[counter].permalink_url,
          volume: musicList3[counter].volume,
          soundcloudUser: musicList3[counter].soundcloudUser
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
          artist: musicList4[counter].artist,          
          soundcloudTrack: musicList4[counter].soundcloudTrack,
          permalink_url: musicList4[counter].permalink_url,
          volume: musicList4[counter].volume,
          soundcloudUser: musicList4[counter].soundcloudUser
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

app.post('/makeSongList5', function(req, res) {
  models.SongList.create({
    genre: "pop"
  }).then(function(songList) {

    function songLoop(counter) {
      var title;
      if (counter > 0) {
        title = "whatever" + counter;
        counter--;
        models.Song.create({
          genre: musicList5[counter].genre,
          title: musicList5[counter].title,
          artist: musicList5[counter].artist,          
          soundcloudTrack: musicList5[counter].soundcloudTrack,
          permalink_url: musicList5[counter].permalink_url,
          volume: musicList5[counter].volume,
          soundcloudUser: musicList5[counter].soundcloudUser
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
    songLoop(musicList5.length);
  });
});

app.post('/makeSongList6', function(req, res) {
  models.SongList.create({
    genre: "classical"
  }).then(function(songList) {

    function songLoop(counter) {
      var title;
      if (counter > 0) {
        title = "whatever" + counter;
        counter--;
        models.Song.create({
          genre: musicList6[counter].genre,
          title: musicList6[counter].title,
          artist: musicList6[counter].artist,          
          soundcloudTrack: musicList6[counter].soundcloudTrack,
          permalink_url: musicList6[counter].permalink_url,
          volume: musicList6[counter].volume,
          soundcloudUser: musicList6[counter].soundcloudUser
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
    songLoop(musicList6.length);
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
