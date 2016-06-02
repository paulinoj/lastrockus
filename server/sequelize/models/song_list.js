'use strict';
module.exports = function(sequelize, DataTypes) {
  var SongList = sequelize.define('SongList', {
    genre: DataTypes.STRING,
    active: { type: DataTypes.BOOLEAN,
              defaultValue: true }
  }, {
    classMethods: {
      associate: function(models) {
        SongList.hasMany(models.Song);
        SongList.belongsToMany(models.User, {through: 'UserSongList'});
      }
    }
  });
  return SongList;
};
