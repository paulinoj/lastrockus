const request = require('request');
const models = require('../sequelize/models');

var soundcloudKey;
if (process.env.SOUNDCLOUDKEY) {
  soundcloudKey = process.env.SOUNDCLOUDKEY;
}
else
{
  soundcloudKey = require('../../soundcloud.config.js')["key"];
}

exports.eighties = function(req, res, next) {
  // JOHN you need to handle errors, i.e.
  // if (err) { return next(err); }
  models.User.findById(req.user.id).then(function(user) {
    user.getSongLists().then(function(songLists) {
      var excludeList = songLists.map(function(songList) {
        return songList.id;
      });
      excludeList.push(0);
      models.SongList.findAll({ where: { id: { $notIn: excludeList }, genre: "eighties" } }).then(function(songLists) {
        if (songLists[0]) {
          user.addSongList(songLists[0]);
          console.log(songLists);
          songLists[0].getSongs().then(function(songs) {
            var responseList = songs.map(function(song) {
              return { title: song.dataValues.title, url: `/song/${song.id}`}
            });
            res.json(responseList);
          });          
        }
        else
        {
          res.json([]);
        }
      });
    });
  });
};

exports.classical = function(req, res, next) {
  // JOHN you need to handle errors, i.e.
  // if (err) { return next(err); }
  models.User.findById(req.user.id).then(function(user) {
    user.getSongLists().then(function(songLists) {
      var excludeList = songLists.map(function(songList) {
        return songList.id;
      });
      excludeList.push(0);
      models.SongList.findAll({ where: { id: { $notIn: excludeList }, genre: "classical" } }).then(function(songLists) {
        if (songLists[0]) {
          user.addSongList(songLists[0]);
          console.log(songLists);
          songLists[0].getSongs().then(function(songs) {
            var responseList = songs.map(function(song) {
              return { title: song.dataValues.title, url: `/song/${song.id}`}
            });
            res.json(responseList);
          });          
        }
        else
        {
          res.json([]);
        }
      });
    });
  });
};

exports.song = function(req, res, next) {
  models.Song.findById(Number(req.params.number)).then(function(song) {
    // Either make function for creating soundcloudURL or make method on song model
    const soundcloudURL = `https://api.soundcloud.com/tracks/${song.soundcloudTrack}/stream?client_id=${soundcloudKey}`;
    request.get(soundcloudURL).pipe(res);
  });
};
