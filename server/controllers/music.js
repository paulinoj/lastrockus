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
    const soundcloudURL = `https://api.soundcloud.com/tracks/${song.soundcloudTrack}/stream?client_id=${soundcloudKey}`;
    request.get(soundcloudURL).pipe(res);
  });
};
