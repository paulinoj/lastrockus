'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserSongList = sequelize.define('UserSongList', {
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return UserSongList;
};

