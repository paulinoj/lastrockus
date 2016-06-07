'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserSongList = sequelize.define('UserSongList', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    email: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return UserSongList;
};

