'use strict';
module.exports = function(sequelize, DataTypes) {
  var Song = sequelize.define('Song', {
    genre: DataTypes.STRING,
    title: DataTypes.STRING,
    alt_title: DataTypes.STRING,
    artist: DataTypes.STRING,
    soundcloudTrack: DataTypes.STRING,
    soundcloudUser: DataTypes.STRING,    
    SongListId: DataTypes.INTEGER,
    permalink_url: DataTypes.STRING,
    volume: DataTypes.DECIMAL,
    start_time: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Song.belongsTo(models.SongList);
      }
    }
  });
  return Song;
};