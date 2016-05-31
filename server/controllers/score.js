const models = require('../sequelize/models');

exports.save = function(req, res, next) {
  // JOHN you need to handle errors, i.e.
  // if (err) { return next(err); }
  const songListId = Number(req.body.songListId);
  const score = Number(req.body.score);
  models.User.findById(req.user.id).then(function(user) {
    console.log("DO WE GET TO SAVE SCORE", songListId, score);

    models.SongList.findById(songListId).then(function(songList) {
      user.addSongList(songList, { score: score });
      return res.json({ scoreSaved: true });
    });
  });

  // return res.json({ scoreSaved: false });
};

