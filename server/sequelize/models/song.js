'use strict';
module.exports = function(sequelize, DataTypes) {
  var Song = sequelize.define('Song', {
    genre: DataTypes.STRING,
    title: DataTypes.STRING,
    soundcloudTrack: DataTypes.STRING,
    SongListId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Song.belongsTo(models.SongList);
      }
    }
  });
  return Song;
};