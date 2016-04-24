const request = require('request');
const models = require('../sequelize/models');
const soundcloud = require('../../soundcloud2.config.js');

exports.classical = function(req, res, next) {
  // JOHN you need to handle errors, i.e.
  // if (err) { return next(err); }
  models.SongList.findById(1).then(function(songList) {
    songList.getSongs().then(function(songs) {
      console.log(songs);
      const responseList = songs.map(function(song) {
        return { title: song.dataValues.title, url: `/song/${song.id}`}
      });
      console.log("RESPONSELIST");
      console.log(responseList);
      res.json(responseList);
    });
  });
};

exports.song = function(req, res, next) {
  models.Song.findById(Number(req.params.number)).then(function(song) {
    // Either make function for creating soundcloudURL or make method on song model
    const soundcloudURL = `https://api.soundcloud.com/tracks/${song.soundcloudTrack}/stream?client_id=${soundcloud.key}`;
    request.get(soundcloudURL).pipe(res);
  });
};
