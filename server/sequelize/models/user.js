'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    // userName: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    SongListId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.SongList);
      }
    },
    instanceMethods: {
      comparePassword: function(candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
          if (err) { return callback(err); }
          callback(null, isMatch);
        });
      }
    },
    hooks: {
      beforeCreate: function(user, options, next) {
        user.email = user.email.toLowerCase();
        // generate a salt then run callback
        bcrypt.genSalt(10, function(err, salt) {
          if (err) { return next(err); }

          // hash our password using the salt
          bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            // overwrite plain text password with encrypted password
            user.password = hash;
            console.log("USER.PASSWORD, ", user.password);
            // go ahead and save the model
            next();
          });
        });
      }
    }    
  });
  return User;
};
