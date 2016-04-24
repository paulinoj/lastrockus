'use strict';
module.exports = function(sequelize, DataTypes) {
  var SongList = sequelize.define('SongList', {
    genre: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        SongList.hasMany(models.Song);
      }
    }
  });
  return SongList;
};